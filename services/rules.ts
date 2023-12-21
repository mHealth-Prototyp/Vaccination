import {StugnaES} from 'stugna-es';
import {RISKS} from '../assets/codesystems/risks';
import {VACCINES} from '../assets/codesystems/vaccines';
import {getTimeDifference} from './utils';
import {Condition, Immunization, ImmunizationStatus, Patient, PatientAdministrativeGender, isInPeriod} from '@i4mi/fhir_r4';
import {Fact} from 'src/models/types';
import {ref} from 'vue';
import {CHVacdVaccinationRecordDocument} from '@i4mi/fhir_ch';

export const TARGET_DISEASE_SYSTEM = 'http://fhir.ch/ig/ch-vacd/ConceptMap-ch-vacd-vaccines-targetdiseases-cm.html';
export const CONDITION_CATEGORY_SYSTEM = 'http://terminology.hl7.org/CodeSystem/condition-category';
export const CONDITION_CATEGORY_CODE = 'problem-list-item';
export const VACC_CODE_SYSTEMS = ['http://fhir.ch/ig/ch-vacd/CodeSystem/ch-vacd-swissmedic-cs', 'http://fhir.ch/ig/ch-vacd/CodeSystem/ch-vacd-myvaccines-cs'];
export const NO_VACC_CODES = ['no-immunization-info', 'no-known-immunizations'];

const DISEASES = new Array<{
  code: string;
  system: string;
  display: string;
}>();

// prepare diseases
VACCINES.forEach((vacc) => {
  vacc.target.forEach((target) => {
    const i = DISEASES.findIndex((disease) => disease.code === target.code);
    if (i === -1) {
      DISEASES.push({
        code: target.code,
        system: target.system,
        display: target.display.toUpperCase()
      });
    }
  });
});

export interface Rule {
  condition: string;
  factName: string;
  factValue: number | string | boolean;
  description?: string;
  priority?: number;
}

export interface GeneratedFact extends Fact {
  history: string[];
  changed: boolean;
}

const stugna = new StugnaES({toExplainMore: true});

let ruleFacts = new Array<string>();
const numberOfFacts = ref(0);
const resultingFacts = ref(new Array<GeneratedFact>());
const facts = ref<Fact[]>(stugna.factsAllAsArray() as Fact[]);

function setVaccinationRecord(record: CHVacdVaccinationRecordDocument) {
  stugna.factsClear();
  stugna.factsImport(generateFacts(record), true);
  resultingFacts.value = getResultingFacts();
  numberOfFacts.value = getNumberOfFacts();
  facts.value = stugna.factsAllAsArray();
}

function setRules(rules: Rule[]) {
  stugna.rulesClear();
  stugna.rulesImport(rules, true);
  ruleFacts = rules.map((r) => r.factName);
  resultingFacts.value = getResultingFacts();
  facts.value = stugna.factsAllAsArray();
  numberOfFacts.value = getNumberOfFacts();
}

function getRules(): Rule[] {
  return stugna.rulesAll();
}

function getNumberOfFacts(): number {
  return Object.keys(stugna._facts).length;
}

export function useRuleEngine() {
  return {
    setVaccinationRecord,
    setRules,
    getRules,
    facts,
    numberOfFacts,
    resultingFacts
  };
}

function getResultingFacts(includeMissing = false): GeneratedFact[] {
  const facts = new Array<GeneratedFact>();
  ruleFacts.forEach((factName) => {
    const fact = stugna._facts[factName];
    if (fact && fact.value) {
      facts.push(fact);
    } else if (includeMissing) {
      facts.push({
        name: fact,
        value: undefined,
        description: '',
        changed: false,
        history: []
      });
    }
  });
  return facts;
}

function generateFacts(vaccinationRecord: CHVacdVaccinationRecordDocument): Fact[] {
  const vaccines: {
    id: string;
    facts: Fact[];
  }[] = [];
  const diseases: {
    id: string;
    facts: Fact[];
  }[] = [];
  const risks: {
    id: string;
    facts: Fact[];
  }[] = [];
  let patientResource: Patient | undefined;
  vaccinationRecord.entry.forEach((entry) => {
    switch (entry.resource?.resourceType) {
      case 'Patient':
        const pat = entry.resource as Patient;
        if (pat.birthDate && pat.gender) {
          patientResource = pat;
        }
        break;
      case 'Immunization':
        const vacc = entry.resource as Immunization;
        const vacc_coding = vacc.vaccineCode.coding?.find((coding) => coding.system && VACC_CODE_SYSTEMS.includes(coding.system));

        // if code is missing or means absent vaccination, we can stop
        if (!vacc_coding?.code || NO_VACC_CODES.includes(vacc_coding.code)) break;

        // handle vaccine
        const lastDose = getTimeDifference('days', new Date(vacc.occurrenceDateTime!));
        const lastDoseFact = {
          name: 'v' + vacc_coding.code + '_last_dose',
          description: 'The last ' + vacc_coding.display?.toUpperCase() + ' dose was administered ' + lastDose + ' days ago.',
          value: lastDose
        };
        const completedFact = {
          name: 'v' + vacc_coding.code + '_completed',
          description: 'The ' + vacc_coding.display?.toUpperCase() + ' vaccination is ' + (ImmunizationStatus.COMPLETED ? 'completed.' : 'not yet completed.'),
          value: vacc.status === ImmunizationStatus.COMPLETED ? 'TRUE' : 'FALSE'
        };

        const vaccIndex = vaccines.findIndex((v) => v.id === vacc_coding.code);
        if (vaccIndex > -1) {
          // we already have an existing fact for this vaccine
          const existingLastDoseFact = vaccines[vaccIndex].facts.find((fact) => fact.name.includes('last_dose'));

          // check if the existing fact is older, then we replace it:
          if (existingLastDoseFact && (existingLastDoseFact.value as number) > lastDose) {
            vaccines[vaccIndex].facts = [lastDoseFact, completedFact];
          }
        } else {
          vaccines.push({
            id: vacc_coding.code,
            facts: [lastDoseFact, completedFact]
          });
        }

        // handle target diseases
        const targetDiseases = new Array<{code: string; name: string; doseNr: number}>();

        vacc.protocolApplied?.forEach((protocol) => {
          protocol.targetDisease?.forEach((disease) => {
            const coding = disease.coding?.[0];
            coding?.code &&
              targetDiseases.push({
                code: coding.code,
                name: coding.display || '"' + coding.code + '"',
                doseNr: protocol.doseNumberPositiveInt || -1
              });
          });
        });

        targetDiseases.forEach((targetDis) => {
          const diseaseIndex = diseases.findIndex((dis) => dis.id === targetDis.code);

          const diseaseLastDoseFact = {
            name: 'd' + targetDis.code + '_last_dose',
            description: 'The last ' + targetDis.name.toUpperCase().split(' (')[0] + ' dose was administered ' + lastDose + ' days ago.',
            value: lastDose
          };
          const diseaseCompletedFact = {
            name: 'd' + targetDis.code + '_completed',
            description:
              'The ' + targetDis.name.toUpperCase().split(' (')[0] + ' vaccination is ' + (ImmunizationStatus.COMPLETED ? 'completed.' : 'not yet completed.'),
            value: vacc.status === ImmunizationStatus.COMPLETED ? 'TRUE' : 'FALSE'
          };
          const diseaseNrOfDosesFact = {
            name: 'd' + targetDis.code + '_nr_of_doses',
            description:
              targetDis.doseNr === 1
                ? '1 dose of ' + targetDis.name.toUpperCase().split(' (')[0] + ' vaccine was administered.'
                : targetDis.doseNr + ' doses of ' + targetDis.name.toUpperCase().split(' (')[0] + ' vaccine where administered.',
            value: targetDis.doseNr
          };

          if (diseaseIndex > -1) {
            const existingLastDoseFact = diseases[diseaseIndex].facts.find((fact) => fact.name.includes('last_dose'));

            // check if the existing fact is older, then we replace it:
            if (existingLastDoseFact && (existingLastDoseFact.value as number) > lastDose) {
              diseases[diseaseIndex].facts = [diseaseLastDoseFact, diseaseCompletedFact, diseaseNrOfDosesFact];
            }
          } else {
            diseases.push({
              id: targetDis.code,
              facts: [diseaseLastDoseFact, diseaseCompletedFact, diseaseNrOfDosesFact]
            });
          }
        });
        break;

      // handle risks
      case 'Condition':
        const condition = entry.resource as Condition;
        let isProblemListItem = false;
        condition.category?.forEach((cat) => {
          cat.coding?.forEach((coding) => {
            if (coding.system === CONDITION_CATEGORY_SYSTEM && coding.code === CONDITION_CATEGORY_CODE) {
              isProblemListItem = true;
            }
          });
        });
        const coding = condition.code?.coding?.at(0);
        const onset = condition.onsetDateTime;
        const abatement = condition.abatementDateTime;
        if (isProblemListItem && coding && coding.display && coding.code && (!onset || !abatement || isInPeriod({start: onset, end: abatement}))) {
          const riskFact = {
            id: coding.code,
            facts: [
              {
                name: 'r' + coding.code,
                description: 'This patient has a risk of ' + coding.display?.toUpperCase().replace(' (DISORDER)', '.'),
                value: 'TRUE'
              }
            ]
          };
          const i = risks.findIndex((risk) => risk.id === coding.code);
          if (i === -1) {
            risks.push(riskFact);
          } else {
            risks[i] = riskFact;
          }
        }
        break;
    }
  });

  if (!patientResource || !patientResource.birthDate) {
    throw new Error('Bundle with id=' + vaccinationRecord.id + ' is missing wellformed CH Core Patient EPR resource.');
  }

  const age = getTimeDifference('years', new Date(patientResource.birthDate));

  const gender = patientResource.gender!;

  let facts: Fact[] = [
    {
      name: 'gender',
      description: gender === PatientAdministrativeGender.OTHER ? 'This patient has an other gender.' : 'This patient is ' + gender + '.',
      value: gender
    },
    {
      name: 'age',
      description: 'This patient is ' + age + ' year' + (age === 1 ? '' : 's') + ' old.',
      value: age
    }
  ];

  if (age < 2) {
    const months = getTimeDifference('months', new Date(patientResource.birthDate));
    facts.push({
      name: 'age_in_months',
      description: 'This patient is ' + months + ' month' + (months === 1 ? '' : 's') + ' old.',
      value: months
    });
  }

  VACCINES.forEach((vaccine) => {
    const i = vaccines.findIndex((v) => v.id === vaccine.code);

    if (i === -1) {
      facts = facts.concat([
        {
          name: 'v' + vaccine.code + '_last_dose',
          description: vaccine.display.toUpperCase() + ' has not been administered to this patient.',
          value: 'NULL'
        },
        {
          name: 'v' + vaccine.code + '_completed',
          description: 'The ' + vaccine.display.toUpperCase() + ' vaccination is not completed.',
          value: 'FALSE'
        }
      ]);
    } else {
      facts = facts.concat(vaccines[i].facts);
    }
  });

  DISEASES.forEach((disease) => {
    const i = diseases.findIndex((d) => d.id === disease.code);
    const newFacts = [
      {
        name: 'd' + disease.code + '_last_dose',
        description: disease.display.toUpperCase() + ' has not been administered to this patient.',
        value: 'NULL'
      },
      {
        name: 'd' + disease.code + '_completed',
        description: 'The ' + disease.display.toUpperCase() + ' vaccination is not completed.',
        value: 'FALSE'
      },
      {
        name: 'd' + disease.code + '_nr_of_doses',
        description: 'No doses of ' + disease.display.toUpperCase().split(' (')[0] + ' vaccine were administered.',
        value: 0
      }
    ];
    if (i === -1) {
      facts = facts.concat(newFacts);
    } else {
      const existingFacts = diseases[i].facts;

      if (existingFacts[0] && existingFacts[0].value! > newFacts[0].value) {
        facts = facts.concat(newFacts);
      } else {
        facts = facts.concat(existingFacts);
      }
    }
  });

  RISKS.forEach((risk) => {
    const i = risks.findIndex((r) => r.id === risk.code);

    if (i === -1) {
      facts = facts.concat([
        {
          name: 'r' + risk.code,
          description: 'This patient has no risk of ' + risk.display['en-US'].toUpperCase().split(' (')[0],
          value: 'FALSE'
        }
      ]);
    } else {
      facts = facts.concat(risks[i].facts);
    }
  });

  return facts;
}
