<template>
  <q-page class="full-width row justify-center content-start">
    <div v-if="!loading && store.vaccinationRecord">
      <div v-if="!error">
        <vaccination-document-card
          :document="store.vaccinationRecord"
          :fhir-utils="utils.fhirUtils"
          :language-string="locale"
          :is-mobile="false" />
      </div>
      <p
        v-else
        class="error-message">
        {{ t('common.error') }}
      </p>
    </div>

    <q-linear-progress
      v-else-if="loading"
      indeterminate />
    <p
      v-else-if="store.userIsLogged"
      class="no-document">
      {{ t('immunizationPage.noRecord', {name: getFullName(selectName(store.userResource.name!))}) }}
    </p>
    <div
      v-if="store.vaccinationMetadata.length > 1"
      class="document-select">
      <hr />
      <p>
        {{ t('immunizationPage.multipleDocuments') }}
      </p>
      <q-select
        v-model="selectedMetadata"
        class="selector"
        :options="store.vaccinationMetadata"
        :option-label="(i) => getSelectorLabel(i, true)"
        :label="t('immunizationPage.selectTitle')" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {VaccinationDocumentCard} from '@i4mi/mhealth-proto-components';

import {useStore} from '../stores/store';
import {useUtilsInject} from 'src/composables/composables';
import {useI18n} from 'vue-i18n';
import {MessageLanguages, MessageSchema} from 'src/boot/i18n';
import {ref, watch} from 'vue';
import {CHDocumentReferenceEPR} from '@i4mi/fhir_ch';
import {loadVaccinationRecord} from 'src/services/utils';
import {getFullName, selectName} from '@i4mi/fhir_r4';
const store = useStore();
const utils = useUtilsInject();
const {t, locale} = useI18n<{message: MessageSchema}, MessageLanguages>();

let loading = ref(false);
let error = ref(false);

let selectedMetadata = ref(store.selectedMetadata);

watch(selectedMetadata, (n) => {
  error.value = false;
  if (n) {
    loading.value = true;
    loadVaccinationRecord(n, utils, store)
      .catch(() => (error.value = true))
      .finally(() => (loading.value = false));
  }
});

function getSelectorLabel(dr: CHDocumentReferenceEPR, long = false): string {
  if (dr.date) {
    return (
      t('immunizationPage.selectLabel') +
      new Intl.DateTimeFormat(locale.value).format(new Date(dr.date)) +
      (dr.description && long ? ': ' + dr.description : '')
    );
  }
  return '? ' + (dr.description && long ? ' - ' + dr.description : dr.id);
}
</script>
<style lang="scss">
.immunization-card {
  .card-title {
    background-color: $secondary;
    color: $onSecondary;
  }
  .section-title {
    color: $primary;
  }
}
.no-document {
  margin-top: 2em;
}
.error-message {
  margin-top: 2em;
  font-size: 1.2em;
  text-align: center;
  background-color: $warning;
  padding: 0.5em 1em;
  border-radius: 0.3em;
}
.document-select {
  width: 80%;
  hr {
    margin: 2em 1em;
    border: 0px;
    height: 1px;
    background-color: lightgray;
  }
  p {
    margin: 0 1em 1em;
    text-align: center;
  }
  .selector {
    display: block;
    width: 25em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2em;
    align-self: center;
  }
}
</style>
