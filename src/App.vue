<template>
  <router-view />
</template>

<script setup lang="ts">
import {provide, watch} from 'vue';
import {EpdPlaygroundUtils, FhirUtils} from '@i4mi/mhealth-proto-components';
import {utilsKey} from './services/keys';
import {useStore} from './stores/store';
import {Rule, useRuleEngine} from './services/rules';
import {fetchVaccinationMetaData, loadVaccinationRecord} from './services/utils';
import * as DEFAULT_RULES from './assets/rules.json';

const store = useStore();

const env = {
  FHIR_4_CONTENT_TYPE: process.env.FHIR_4_CONTENT_TYPE!,
  BASE_URL: process.env.BASE_URL!,
  MESSAGE_ENDPOINT: process.env.MESSAGE_ENDPOINT!,
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30'),
  SOURCE_ENDPOINT: process.env.SOURCE_ENDPOINT!,
  TARGET_ENDPOINT: process.env.TARGET_ENDPOINT!,
  IS_2FA_ENABLED: process.env.IS_2FA_ENABLED!
};

const utils = {
  epdUtils: new EpdPlaygroundUtils(env, store.userSettings.OIDs),
  fhirUtils: new FhirUtils(env.BASE_URL, store.userSettings.OIDs)
};
provide(utilsKey, utils);

const {setRules} = useRuleEngine();

setRules(DEFAULT_RULES.default.filter((r) => r._comment === undefined) as Rule[]);

function loadRecord() {
  fetchVaccinationMetaData(utils, store).then(() => {
    if (store.selectedMetadata) {
      loadVaccinationRecord(store.selectedMetadata, utils, store);
    }
  });
}
if (store.userIsLogged) {
  loadRecord();
}

watch(store.userResource, (n) => {
  if (n.name && store.userIsLogged) loadRecord();
});
</script>

<style lang="scss">
html {
  background-color: $light-page;
}

.card-title {
  color: $primary;
  font-size: 1.2em;
  text-align: center;
  font-weight: bolder;
}

.q-card {
  margin: 1.5em;
}

.q-card p {
  margin-bottom: 0.4em;
  text-align: justify;
}

.q-drawer {
  background-color: $light-page;
  border-top: 1px solid $primary;
}

.q-drawer--left.q-drawer--bordered {
  border-right: 1px solid $primary;
}

a {
  text-decoration: none;
  color: $primary;
}

a:hover {
  text-decoration: none;
  color: $secondary;
}

a:visited {
  text-decoration: none;
  color: $dark;
}
</style>
