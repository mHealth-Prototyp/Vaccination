<template>
  <QCard>
    <QCardSection class="card-title">
      <h2>
        {{ t('ruleCard.title') }}
        <span class="patient-name">{{ patient.name }}</span>
        <!-- this comment is necessary because of "prettier"-->,
        {{ new Intl.DateTimeFormat(locale).format(patient.birthDate) }}
      </h2>
    </QCardSection>

    <QCardSection>
      <h3 class="section-title">{{ t('ruleCard.resultsTitle') }}</h3>
      <p>
        {{
          resultingFacts.filter((f) => f.name.indexOf('x_') != 0).length === 0
            ? t('ruleCard.noRecommendation', {name: getFullName(selectName(store.userResource.name!))})
            : t('ruleCard.recommendationText', {name: getFullName(selectName(store.userResource.name!))})
        }}
      </p>
      <ul class="fact-list">
        <li
          v-for="fact in resultingFacts.filter((f) => f.name.indexOf('x_') != 0)"
          :key="fact.name"
          class="rule-recommandation">
          <q-expansion-item
            expand-separator
            :label="getFactText(fact)">
            <q-card>
              <q-card-section>
                <p>{{ t('ruleCard.factName') }} {{ fact.name }} = {{ fact.value }}</p>
                <ul v-if="fact.history">
                  <li
                    v-for="entry of fact.history"
                    :key="entry">
                    {{ entry }}
                  </li>
                </ul>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </li>
      </ul>
    </QCardSection>
    <QSeparator />
    <QCardSection>
      <p>
        {{ t('ruleCard.resultDescription', {rules: parsedRules.length, facts: numberOfFacts}) }}
        <br />
        [
        <a
          @click="
            () => {
              showRules = !showRules;
              showFacts = false;
            }
          "
          >{{ showRules ? t('ruleCard.hideRules') : t('ruleCard.showRules') }}
        </a>
        ] [
        <a
          @click="
            () => {
              showFacts = !showFacts;
              showRules = false;
            }
          "
          >{{ showFacts ? t('ruleCard.hideFacts') : t('ruleCard.showFacts') }}
        </a>
        ]
      </p>
    </QCardSection>

    <QCardSection v-if="showRules">
      <h3 class="section-title">{{ t('ruleCard.rulesTitle') }}</h3>
      <textarea
        v-model="rulesText"
        disabled
        :class="{'invalid-rules': !rulesValid}"
        :rows="Math.max(4, Math.min(30, rulesText.split(/\r\n|\r|\n/).length))"
        cols="50" />
    </QCardSection>

    <QCardSection v-if="showFacts">
      <h3 class="section-title">{{ t('ruleCard.factsTitle') }}</h3>
      <textarea
        v-model="factsText"
        disabled
        :rows="Math.max(4, Math.min(30, factsText.split(/\r\n|\r|\n/).length))"
        cols="50" />
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import {selectName, getFullName, Composition} from '@i4mi/fhir_r4';
import {QCard, QCardSection, QSeparator} from 'quasar';
import {MessageSchema, MessageLanguages} from 'src/boot/i18n';
import {CHPatientEPR, CHVacdVaccinationRecordDocument} from '@i4mi/fhir_ch';
import {Rule, useRuleEngine} from 'src/services/rules';
import {getLinkedResource} from 'src/services/utils';
import {computed, ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useStore} from 'src/stores/store';

const store = useStore();
const {t, locale, te} = useI18n<{message: MessageSchema}, MessageLanguages>();

const {numberOfFacts, resultingFacts, getRules, facts} = useRuleEngine();

const props = defineProps<{
  document: CHVacdVaccinationRecordDocument;
}>();

let rulesText = ref(JSON.stringify(getRules(), null, 2));
let factsText = ref(JSON.stringify(facts.value, null, 2));
let parsedRules = ref(getRules());
let rulesValid = ref(true);

let showRules = ref(false);
let showFacts = ref(false);

const patient = computed(() => {
  const composition = props.document.entry.find((entry) => entry.resource.resourceType === 'Composition')?.resource as Composition;
  if (composition) {
    const patient = getLinkedResource(props.document, composition.subject?.reference) as CHPatientEPR;
    return {
      name: getFullName(selectName(patient.name)),
      birthDate: new Date(patient.birthDate)
    };
  } else {
    return {
      name: '',
      birthDate: new Date()
    };
  }
});

function getFactText(fact: {name: string; history?: string[]}): string {
  return te('ruleCard.rules.' + fact.name) ? t('ruleCard.rules.' + fact.name) : fact.history?.at(-1)?.split(': ')[1] || '';
}

watch(rulesText, (n) => {
  if (showRules.value) {
    try {
      parsedRules.value = JSON.parse(n) as Rule[];
      rulesValid.value = true;
    } catch (e) {
      rulesValid.value = false;
      console.log('Error on rules', e);
    }
  }
});
</script>

<style scoped lang="scss">
.card-title h2 {
  font-size: unset;
  line-height: unset;
}
.card-title {
  background-color: $secondary;
  color: $onSecondary;
}
.card-title .patient-name {
  font-weight: bolder;
}
.section-title {
  font-size: 1.2em;
  font-weight: bolder;
  padding-left: 0;
  padding-bottom: 0.5em;
  line-height: unset;
  color: $primary;
}
.risk-list {
  margin: 0;
}
.risk-detail {
  color: darkgrey;
}
.vaccination-metadata table {
  padding: 0.3em;
  background-color: #fafafa;
  border-radius: 0.3em;
  width: 100%;
}
.invalid-rules {
  border-top: 0.4em solid red;
}

.rule-recommandation {
  list-style: none;
  max-width: 40em;
  min-width: 20em;
  background-color: $info;
  margin-bottom: 1em;
  margin-right: 1em;
  border-radius: 0.3em;
  display: inline-block;
  ul {
    padding-left: 1em;
  }
}
textarea {
  width: 100%;
  opacity: unset !important;
  cursor: unset !important;
  color: black;
}
</style>
