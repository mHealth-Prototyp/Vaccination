import {EpdPlaygroundUtils, FhirUtils, SystemCode} from '@i4mi/mhealth-proto-components';
import {MessageLanguages} from 'src/boot/i18n';

export const VACCINATION_DOCUMENT_TYPE = 'http://snomed.info/sct|41000179103';

export type User = {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  mobilePhoneNumber: string;
};

export type Settings = {
  language: MessageLanguages;
  facilityType: SystemCode;
  practiceSetting: SystemCode;
  OIDs: {
    eprSpid: string;
    mpiId: string;
    local: string;
    ahv: string;
    app: string;
  };
};

export type Utils = {
  epdUtils: EpdPlaygroundUtils;
  fhirUtils: FhirUtils;
};

export type Fact = {
  name: string;
  description: string;
  value?: string | number;
};

export interface Login {
  emailAddress: string;
  password: string;
  mobilePhoneNumber: string;
  firstName: string;
  lastName: string;
  description: {
    de: string;
    fr: string;
  };
}
