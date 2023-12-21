<template>
  <q-page class="full-width justify-center content-start page">
    <h2>{{ t('createPage.title') }}</h2>
    <div
      v-if="showPractitioners"
      class="practitioner">
      <a @click="showPractitioners = false">[{{ t('createPage.practitioners.hide') }}]</a>
      <h3>{{ t('createPage.practitioners.title') }}</h3>
      <table>
        <tr>
          <td>{{ t('createPage.prefix') }}</td>
          <td><input v-model="pPrefix" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.given') }}</td>
          <td><input v-model="pGiven" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.family') }}</td>
          <td><input v-model="pFamily" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.practitioners.organization') }}</td>
          <td><input v-model="pOrg" /></td>
        </tr>
      </table>
      <button @click="addPractitioner">{{ t('createPage.add') }}</button>
      <ul>
        <li
          v-for="(p, i) in store.practitioners"
          :key="'practi-' + i">
          {{ p.prefix + ' ' + p.given + ' ' + p.family + ' (' + p.org + ')' }}
          <a @click="store.practitioners.splice(i, 1)">[x]</a>
        </li>
      </ul>
    </div>
    <a
      v-else
      @click="showPractitioners = true"
      >{{ t('createPage.practitioners.show') }}</a
    >
    <div class="patient">
      <h3>{{ t('createPage.patient.title') }}</h3>
      <table>
        <tr>
          <td>{{ t('createPage.given') }}</td>
          <td><input v-model="given" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.family') }}</td>
          <td><input v-model="family" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.patient.birthdate') }}</td>
          <td><input v-model="birthDate" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.gender.label') }}</td>
          <!--td><input v-model="gender" /></td-->
          <td>
            <select v-model="gender">
              <option
                v-for="g in ['MALE', 'FEMALE', 'OTHER']"
                :key="g"
                :value="g">
                {{ t('createPage.gender.' + g) }}
              </option>
            </select>
          </td>
        </tr>
      </table>
    </div>

    <div class="vaccinations">
      <h3>{{ t('createPage.vaccinations.title') }}</h3>
      <table>
        <tr>
          <td>{{ t('createPage.id') }}</td>
          <td>
            <input v-model="vacc.id" />&nbsp;
            <select v-model="vacc.id">
              <option
                v-for="v in VACCINES.sort((a, b) => (a.display > b.display ? 1 : -1))"
                :key="v.code"
                :value="v.code">
                {{ v.display }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{{ t('createPage.vaccinations.date') }}</td>
          <td><input v-model="vacc.date" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.vaccinations.lot') }}</td>
          <td><input v-model="vacc.lot" /><span @click="refreshLot"> ↺</span></td>
        </tr>
        <tr>
          <td>{{ t('createPage.vaccinations.dose') }}</td>
          <td>
            <input
              v-model="vacc.dose"
              type="number" />
          </td>
        </tr>
        <tr>
          <td>{{ t('createPage.vaccinations.completed') }}</td>
          <td>
            <input
              v-model="vacc.completed"
              type="checkbox" />
          </td>
        </tr>
        <tr>
          <td>{{ t('createPage.vaccinations.performer') }}</td>
          <td>
            <select v-model="vacc.performer">
              <option
                v-for="p in store.practitioners"
                :key="p.uuid"
                :value="p.uuid">
                {{ p.prefix + ' ' + p.given + ' ' + p.family + ' (' + p.org + ')' }}
              </option>
            </select>
          </td>
        </tr>
      </table>
      <button @click="vaccinations.push({...vacc})">{{ t('createPage.add') }}</button>
      <ul>
        <li
          v-for="(v, i) in vaccinations"
          :key="v.id">
          {{ v.id + ' (dose: ' + v.dose + (v.completed ? ' ✔️' : ' ✖️') + ', lot: ' + v.lot + ') on ' + v.date }}
          <a @click="vaccinations.splice(i, 1)">[x]</a>
        </li>
      </ul>
    </div>

    <div class="risks">
      <h3>{{ t('createPage.risks.title') }}</h3>
      <table>
        <tr>
          <td>{{ t('createPage.id') }}</td>
          <td>
            <input v-model="risk.id" />&nbsp;
            <select v-model="risk.id">
              <option
                v-for="r in RISKS.sort((a, b) => (a.display['en-US'] > b.display['en-US'] ? 1 : -1))"
                :key="r.code"
                :value="r.code">
                {{ r.display['en-US'] }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{{ t('createPage.risks.recorded') }}</td>
          <td><input v-model="risk.date" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.risks.onset') }}</td>
          <td><input v-model="risk.onSetDate" /></td>
        </tr>
        <tr>
          <td>{{ t('createPage.risks.recorder') }}</td>
          <td>
            <select v-model="risk.recorder">
              <option
                v-for="p in store.practitioners"
                :key="p.uuid"
                :value="p.uuid">
                {{ p.prefix + ' ' + p.given + ' ' + p.family + ' (' + p.org + ')' }}
              </option>
            </select>
          </td>
        </tr>
      </table>
      <button @click="risks.push({...risk})">{{ t('createPage.add') }}</button>
      <ul>
        <li
          v-for="(r, i) in risks"
          :key="i">
          {{ r.id + ' ' }}
          <a @click="risks.splice(i, 1)">[x]</a>
        </li>
      </ul>
    </div>

    <hr />
    <button @click="createResource">{{ t('createPage.create') }}</button>&nbsp;&nbsp;
    <input
      v-model="clipboard"
      type="checkbox" />
    {{ t('createPage.clipboard') }}<br /><br />
    <button
      v-if="resource"
      @click="
        resource = undefined;
        transaction = {error: false, done: false, processing: false};
      ">
      {{ t('createPage.reset') }}</button
    >&nbsp;&nbsp;
    <button
      v-if="resource && store.userIsLogged && family === patName.family && birthDate === store.userResource.birthDate"
      :disabled="transaction.processing || transaction.done"
      :class="{error: transaction.error, success: transaction.done}"
      @click="upload">
      {{ t('createPage.upload') }}</button
    >&nbsp;&nbsp;
    <button
      v-if="resource"
      @click="() => (store.vaccinationRecord = resource)">
      {{ t('createPage.set') }}
    </button>

    <pre
      v-if="resource"
      class="resource"
      >{{ JSON.stringify(resource, null, 2) }}
    </pre>
  </q-page>
</template>

<script setup lang="ts">
import {
  CHPatientEPR,
  CHVacdCompositionVaccinationRecord,
  CHVacdCondition,
  CHVacdImmunization,
  CHVacdVaccinationRecordDocument,
  CHVacdVaccinationRecordDocumentEntryResource
} from '@i4mi/fhir_ch';
import {
  BundleType,
  CompositionSection,
  CompositionStatus,
  ImmunizationStatus,
  Organization,
  Patient,
  PatientAdministrativeGender,
  Practitioner,
  PractitionerRole
} from '@i4mi/fhir_r4';
import {ref, watch} from 'vue';
import {v4 as uuidv4} from 'uuid';
import {useStore} from 'src/stores/store';
import {VACCINES} from '../assets/codesystems/vaccines';
import {RISKS} from '../assets/codesystems/risks';
import {uploadToEPDPlayground} from 'src/services/utils';
import {ITI_65_AUTHOR_ROLE, Iti65Metadata} from '@i4mi/mhealth-proto-components';
import {useUtilsInject} from 'src/composables/composables';
import {MessageSchema, MessageLanguages} from 'src/boot/i18n';
import {useI18n} from 'vue-i18n';

const {t} = useI18n<{message: MessageSchema}, MessageLanguages>();

const store = useStore();
const utils = useUtilsInject();

const resource = ref<CHVacdVaccinationRecordDocument>();
const clipboard = ref(false);

const LOCALE = 'en-US';

const transaction = ref({
  done: false,
  error: false,
  processing: false
});

// Practitioner
let showPractitioners = ref(true);
if (store.practitioners.length === 0) {
  store.practitioners.push({
    uuid: uuidv4(),
    prefix: 'Dr. med.',
    given: 'Hanspeter',
    family: 'Wenger',
    org: 'Klinik Höheweg'
  });
}
let pPrefix = ref('Dr. med.');
let pGiven = ref('');
let pFamily = ref('');
let pOrg = ref('');

function addPractitioner() {
  store.practitioners.push({
    uuid: uuidv4(),
    prefix: pPrefix.value,
    given: pGiven.value,
    family: pFamily.value,
    org: pOrg.value
  });
  pGiven.value = pFamily.value = pOrg.value = '';
}

// Vaccionations
interface Vaccination {
  id: string;
  date: string;
  display: string;
  completed: boolean;
  lot: string;
  performer: string;
  dose: number;
}

let vaccinations = ref(new Array<Vaccination>());
let vacc = ref<Vaccination>({
  id: '',
  display: '',
  date: '',
  completed: false,
  performer: store.practitioners[0] ? store.practitioners[0].uuid : '',
  lot: '',
  dose: 1
});
refreshLot();

// Risks
interface Risk {
  id: string;
  display: string;
  date: string;
  onSetDate: string;
  recorder: string;
}
let risks = ref(new Array<Risk>());
let risk = ref({
  id: '',
  display: '',
  date: '',
  onSetDate: '',
  recorder: store.practitioners[0] ? store.practitioners[0].uuid : ''
});

const patName = store.userResource.name ? store.userResource.name[0] || {family: '', given: ['']} : {family: '', given: ['']};
// Patient
let given = ref(patName.given?.reduce((a, b) => a + ' ' + b));
let family = ref(patName.family + '');
let gender = ref(store.userResource.gender?.toUpperCase());
let birthDate = ref(store.userResource?.birthDate + '');

function add(r: CHVacdVaccinationRecordDocumentEntryResource) {
  if (resource.value?.entry) {
    resource.value.entry.push({
      fullUrl: 'https://www.e-health-suisse.ch/' + r.resourceType + '/' + r.id,
      resource: r
    });
  }
}
function getPractitionerResources(uuid: string): {
  uuid: string;
  practitioner: Practitioner;
  organisation: Organization;
  practitionerRole: PractitionerRole;
} {
  const pract = store.practitioners.find((p) => p.uuid === uuid);
  if (!pract) throw new Error('Can not find Practitioner ' + uuid + ' - it has probably been deleted after being referenced.');
  return {
    uuid: uuid,
    practitioner: {
      resourceType: 'Practitioner',
      id: 'practitioner-' + uuid,
      identifier: [
        {
          system: 'urn:ietf:rfc:3986',
          value: 'urn:uuid:' + uuidv4()
        }
      ],
      name: [
        {
          prefix: [pract.prefix],
          family: pract.family,
          given: pract.given.split(' ')
        }
      ]
    },
    organisation: {
      resourceType: 'Organization',
      id: 'organization-' + uuid,
      name: pract.org
    },
    practitionerRole: {
      resourceType: 'PractitionerRole',
      id: 'role-' + uuid,
      practitioner: {
        reference: 'Practitioner/' + 'practitioner-' + uuid
      },
      organization: {
        reference: 'Organization/' + 'organization-' + uuid
      }
    }
  };
}

function refreshLot() {
  vacc.value.lot = (Math.random() + 1).toString(36).substring(4).toUpperCase();
}

function createResource() {
  transaction.value = {error: false, done: false, processing: false};
  const PAT_IDENTIFIER_SYSTEM = 'urn:oid:2.16.756.5.30.1.178.1.1';
  const PAT_ID = Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 100) + '.' + Math.floor(Math.random() * 100);

  const compositionTitle = ref('Immunization Administration');

  const createDate = new Date().toISOString();

  const relevantPractitioners: {
    uuid: string;
    practitioner: Practitioner;
    organisation: Organization;
    practitionerRole: PractitionerRole;
  }[] = [];

  resource.value = {
    resourceType: 'Bundle',
    id: uuidv4(),
    meta: {
      profile: ['http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-document-vaccination-record']
    },
    identifier: {
      system: 'urn:ietf:rfc:3986',
      value: 'urn:uuid:' + uuidv4()
    },
    type: BundleType.DOCUMENT,
    timestamp: createDate,
    entry: []
  };

  const patientAuthor: Patient = {
    resourceType: 'Patient',
    id: 'patientauthor',
    identifier: [
      {
        system: 'urn:ietf:rfc:3986',
        value: 'urn:uuid:' + uuidv4()
      }
    ],
    active: true,
    name: [
      {
        family: 'system',
        given: ['generated by'],
        prefix: ['document']
      }
    ]
  };

  const patient: CHPatientEPR = {
    active: true,
    id: 'Patient-' + PAT_ID,
    identifier: [
      {
        system: PAT_IDENTIFIER_SYSTEM,
        value: 'PAT.' + PAT_ID
      }
    ],
    meta: {
      profile: ['http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-patient', 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-patient-epr']
    },
    name: [
      {
        family: family.value,
        given: given.value?.split(' ')
      }
    ],
    gender: gender.value.toLowerCase() as PatientAdministrativeGender,
    birthDate: birthDate.value,
    resourceType: 'Patient'
  };
  const cid = uuidv4();
  const composition: CHVacdCompositionVaccinationRecord = {
    id: cid,
    identifier: {
      system: 'urn:ietf:rfc:3986',
      value: 'urn:uuid:' + cid
    },
    language: LOCALE,
    status: CompositionStatus.FINAL,
    type: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '41000179103',
          display: 'Immunization record'
        }
      ]
    },
    subject: {
      type: 'Patient',
      reference: 'Patient/' + patient.id
    },
    date: createDate,
    author: [{reference: 'Patient/' + patientAuthor.id}],
    title: compositionTitle.value,
    resourceType: 'Composition',
    confidentiality: 'N',
    _confidentiality: {
      extension: [
        {
          url: 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-confidentialitycode',
          valueCodeableConcept: {
            coding: [
              {
                system: '2.16.840.1.113883.6.96',
                code: '17621005',
                display: 'Normal'
              }
            ]
          }
        }
      ]
    }
  };

  const administrationSection: CompositionSection = {
    id: 'administration',
    title: 'Immunization Administration',
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '11369-6',
          display: 'Hx of Immunization'
        }
      ]
    },
    entry: []
  };
  const pastillnessSection: CompositionSection = {
    id: 'pastillnesses',
    title: 'Undergone illnesses for immunization',
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '11348-0',
          display: 'Hx of Past illness"'
        }
      ]
    },
    entry: []
  };
  const allergiesSection: CompositionSection = {
    id: 'allergies',
    title: 'Allergies and adverse reactions Document',
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '48765-2',
          display: 'Allergies and adverse reactions Document"'
        }
      ]
    },
    entry: []
  };
  const riskSection: CompositionSection = {
    id: 'medicalproblems',
    title: 'Problem list Reported',
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '11450-4',
          display: 'Problem list Reported'
        }
      ]
    },
    entry: []
  };

  add(composition);
  add(patientAuthor);
  add(patient);

  vaccinations.value.forEach((v) => {
    // find practitioner:
    let practitionerResources = relevantPractitioners.find((p) => p.uuid === v.performer);

    if (!practitionerResources) {
      practitionerResources = getPractitionerResources(v.performer);
      relevantPractitioners.push(practitionerResources);
    }

    // find vaccine
    const vacc = VACCINES.find((va) => va.code === v.id);

    if (!vacc) throw new Error('Can not find vaccination for code ' + v.id);

    const occurenceDate = new Date(v.date);
    occurenceDate.setHours(Math.floor(Math.random() * 8) + 8);
    occurenceDate.setMinutes(Math.floor(Math.random() * 60));

    const rid = uuidv4();
    const resource: CHVacdImmunization = {
      id: rid,
      identifier: [{system: 'urn:ietf:rfc:3986', value: 'urn:uuid:' + rid}],
      resourceType: 'Immunization',
      vaccineCode: {
        coding: [
          {
            system: vacc.system,
            code: vacc.code,
            display: vacc.display
          }
        ]
      },
      patient: {
        reference: 'Patient/' + patient.id
      },
      occurrenceDateTime: occurenceDate.toISOString(),
      performer: [
        {
          actor: {
            reference: 'PractitionerRole/' + practitionerResources.practitionerRole.id
          }
        }
      ],
      status: v.completed ? ImmunizationStatus.COMPLETED : ImmunizationStatus.NOT_DONE,
      lotNumber: v.lot,
      protocolApplied: [
        {
          targetDisease: vacc.target.map((t) => {
            return {coding: [t]};
          }),
          doseNumberPositiveInt: v.dose
        }
      ]
    };
    administrationSection.entry!.push({
      reference: 'Immunization/' + resource.id
    });
    add(resource);
  });

  risks.value.forEach((r) => {
    // find practitioner:
    let practitionerResources = relevantPractitioners.find((p) => p.uuid === r.recorder);

    if (!practitionerResources) {
      practitionerResources = getPractitionerResources(r.recorder);
      relevantPractitioners.push(practitionerResources);
    }

    // find risk
    const risk = RISKS.find((ri) => ri.code === r.id);

    if (!risk) throw new Error('Can not find risk for code ' + r.id);

    const rid = uuidv4();
    const resource: CHVacdCondition = {
      id: rid,
      resourceType: 'Condition',
      meta: {
        profile: ['http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-composition-vaccination-record']
      },
      language: LOCALE,
      identifier: [{system: 'urn:ietf:rfc:3986', value: 'urn:uuid:' + rid}],
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/condition-category',
              code: 'problem-list-item',
              display: 'Problem List Item'
            }
          ]
        }
      ],
      code: {
        coding: [
          {
            system: risk.system,
            code: risk.code,
            display: risk.display[LOCALE]
          }
        ]
      },
      clinicalStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
            code: 'resolved',
            display: 'Resolved'
          }
        ]
      },
      verificationStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
            code: 'confirmed',
            display: 'Confirmed'
          }
        ]
      },
      recordedDate: new Date(r.date).toISOString(),
      onsetDateTime: new Date(r.onSetDate).toISOString(),
      subject: {reference: 'Patient/' + patient.id},
      recorder: {reference: 'PractitionerRole/' + practitionerResources.practitionerRole.id}
    };
    riskSection.entry!.push({
      reference: 'Condition/' + resource.id
    });
    add(resource);
  });

  composition.section = [];
  [administrationSection, pastillnessSection, allergiesSection, riskSection].forEach((s) => {
    if (s.entry && s.entry.length > 0) {
      composition.section?.push(s);
    }
  });

  relevantPractitioners.forEach((p) => {
    add(p.practitionerRole);
    add(p.practitioner);
    add(p.organisation);
  });

  // copy to clipboard if wanted
  clipboard.value && navigator.clipboard.writeText(JSON.stringify(resource.value, null, 2));
}

function upload() {
  transaction.value = {
    error: false,
    done: false,
    processing: true
  };
  const today = new Intl.DateTimeFormat('de-CH').format(new Date());
  if (resource.value) {
    const metadata: Iti65Metadata = {
      title: 'Impfdokumentation vom ' + today,
      isFhir: true,
      description: 'Die Impfdokumentation von ' + given.value + ' ' + family.value + ', generiert am ' + today + '.',
      contentLanguage: 'de-CH',
      sourceIdentifier: store.userSettings.OIDs.app,
      categoryCoding: {
        system: 'http://snomed.info/sct',
        code: '184216000',
        display: 'Patient record type'
      },
      typeCoding: {
        system: 'http://snomed.info/sct',
        code: '41000179103',
        display: 'Immunization record'
      },
      facilityCoding: {
        system: 'http://snomed.info/sct',
        code: '264358009',
        display: 'General practice premises'
      },
      practiceSettingCoding: {
        system: 'http://snomed.info/sct',
        code: '394802001',
        display: 'General medicine'
      },
      authorRole: ITI_65_AUTHOR_ROLE.PAT
    };
    uploadToEPDPlayground(resource.value, store.userResource, metadata, utils)
      .then(() => {
        transaction.value = {
          error: false,
          done: true,
          processing: false
        };
      })
      .catch((e) => {
        console.error('Can not upload resource', e, resource.value);
        transaction.value = {
          error: true,
          done: false,
          processing: false
        };
      });
  }
}

watch(clipboard, (n) => {
  n && navigator.clipboard.writeText(JSON.stringify(resource.value, null, 2));
});
</script>
<style scoped lang="scss">
.page {
  padding: 1em;
}
h2 {
  font-size: 1.5rem;
  font-weight: bold;
}
h3 {
  font-size: 1.2rem;
  line-height: 2rem;
}
hr {
  margin: 1em 0;
}
.patient {
  margin-top: 1em;
  background-color: rgb(245, 220, 241);
  padding: 0.5em;
  border-radius: 0.2em;
}
.vaccinations {
  margin-top: 1em;
  background-color: rgb(220, 235, 245);
  padding: 0.5em;
  border-radius: 0.2em;
}
.risks {
  margin-top: 1em;
  background-color: rgb(220, 245, 225);
  padding: 0.5em;
  border-radius: 0.2em;
}
.practitioner {
  margin-top: 1em;
  background-color: rgb(245, 245, 220);
  padding: 0.5em;
  border-radius: 0.2em;
}
button.success {
  background-color: green;
  color: white;
  border-radius: 0.25em;
  border: 1px solid black;
}
button.error {
  background-color: rgb(156, 8, 8);
  color: white;
  border-radius: 0.25em;
  border: 1px solid black;
}
.resource {
  background-color: rgb(230, 230, 230);
  padding: 0.5em;
  width: 100%;
  border-radius: 0.2em;
}
</style>
