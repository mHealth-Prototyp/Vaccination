import {Patient} from '@i4mi/fhir_r4';
import {Settings, User} from './types';

export const defaultUser: User = {
  emailAddress: '',
  password: '',
  mobilePhoneNumber: '',
  firstName: '',
  lastName: ''
};

export const defaultUserResource: Patient = {
  resourceType: 'Patient'
};

export const defaultUserSettings: Settings = {
  language: 'de',
  facilityType: {
    system: 'http://snomed.info/sct',
    code: '394778007',
    display: "Client's or patient's home (environment)"
  },
  practiceSetting: {
    system: 'http://snomed.info/sct',
    code: '394802001',
    display: 'General medicine'
  },
  OIDs: {
    eprSpid: 'urn:oid:2.16.756.5.30.1.127.3.10.3',
    mpiId: 'urn:oid:1.1.1.99.1',
    ahv: 'urn:oid:2.16.756.5.32',
    local: 'urn:oid:2.16.756.5.30.1.178.1.1',
    app: 'urn:oid:1.3.6.1.4.1.12559.11.13.2.5'
  }
};
