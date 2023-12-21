<template>
  <q-page
    v-if="store.vaccinationRecord"
    class="full-width justify-center">
    <rule-engine-card :document="store.vaccinationRecord" />
  </q-page>
  <p
    v-else-if="store.userIsLogged"
    class="no-document">
    {{ t('immunizationPage.noRecord', {name: getFullName(selectName(store.userResource.name!))}) }}
  </p>
</template>

<script setup lang="ts">
import {getFullName, selectName} from '@i4mi/fhir_r4';
import {MessageSchema, MessageLanguages} from 'src/boot/i18n';
import RuleEngineCard from 'src/components/RuleEngineCard.vue';
import {useStore} from 'src/stores/store';
import {useI18n} from 'vue-i18n';

const {t} = useI18n<{message: MessageSchema}, MessageLanguages>();

const store = useStore();
</script>
<style scoped lang="scss">
.no-document {
  margin-top: 2em;
  width: 100%;
  text-align: center;
}
</style>
