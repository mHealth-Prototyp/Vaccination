import {computed, ref, watch} from 'vue';
import {defineStore} from 'pinia';
import {useLocalStorage, useSessionStorage} from '@vueuse/core';
import {defaultUserResource, defaultUserSettings, defaultUser} from 'src/models/defaults';
import {CHDocumentReferenceEPR, CHVacdVaccinationRecordDocument} from '@i4mi/fhir_ch';
import {useRuleEngine} from 'src/services/rules';
import {Patient} from '@i4mi/fhir_r4';
import {Settings} from '@i4mi/mhealth-proto-components';
import {User} from 'src/models/types';

const {setVaccinationRecord} = useRuleEngine();
const storageKey = 'mhealth-proto-vaccination';

interface Pract {
  uuid: string;
  prefix: string;
  given: string;
  family: string;
  org: string;
}

export const useStore = defineStore('store', () => {
  // the selected and downloaded vaccination record
  const vaccinationRecord = ref<CHVacdVaccinationRecordDocument>();
  // the metadata of available vaccination records on the EPR
  const vaccinationMetadata = ref<CHDocumentReferenceEPR[]>([]);
  // the metadata of the selected vaccination recort
  const selectedMetadata = ref<CHDocumentReferenceEPR>();

  const practitioners = ref<Pract[]>([]);

  const user =
    process.env.IS_2FA_ENABLED === 'TRUE' ? useSessionStorage(storageKey + '-user', defaultUser) : useLocalStorage(storageKey + '-user', defaultUser);
  const userIsLogged = computed(() => user.value.emailAddress !== defaultUser.emailAddress);
  const userResource =
    process.env.IS_2FA_ENABLED === 'TRUE'
      ? useSessionStorage(storageKey + '-userResource', defaultUserResource)
      : useLocalStorage(storageKey + '-userResource', defaultUserResource);
  const userSettings = computed(() => {
    if (userIsLogged.value) {
      return useLocalStorage(storageKey + '-userSettings-' + user.value.emailAddress, defaultUserSettings).value;
    } else {
      return defaultUserSettings;
    }
  });

  function logout() {
    user.value = defaultUser;
    userResource.value = defaultUserResource;
    vaccinationRecord.value = undefined;
    vaccinationMetadata.value = [];
    selectedMetadata.value = undefined;
  }

  watch(vaccinationRecord, (n) => {
    n && setVaccinationRecord(n);
  });

  return {user, userIsLogged, userResource, userSettings, logout, vaccinationRecord, vaccinationMetadata, selectedMetadata, practitioners};
});

export type StoreType = {
  user: User;
  practitioners: Pract[];
  userIsLogged: boolean;
  userResource: Patient;
  userSettings: Settings;
  logout: () => void;
  vaccinationRecord: CHVacdVaccinationRecordDocument;
  vaccinationMetadata: CHDocumentReferenceEPR[];
  selectedMetadata: CHDocumentReferenceEPR;
};
