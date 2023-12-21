import {CHDocumentReferenceEPR, CHVacdVaccinationRecordDocument} from '@i4mi/fhir_ch';
import {Bundle, DocumentReferenceStatus, Identifier, Patient, Resource, getIdentifierString} from '@i4mi/fhir_r4';
import {Iti65Metadata} from '@i4mi/mhealth-proto-components';
import {Utils, VACCINATION_DOCUMENT_TYPE} from 'src/models/types';
import {StoreType} from 'src/stores/store';

export async function uploadToEPDPlayground(resource: Resource, patient: Patient, metadata: Iti65Metadata, utils: Utils): Promise<Bundle> {
  const iti65Bundle = await utils.fhirUtils.createIti65Bundle(
    patient,
    new File([JSON.stringify(resource)], metadata.title + '.json', {
      type: 'application/fhir+json'
    }),
    metadata
  );
  return await utils.epdUtils.useITI65(iti65Bundle);
}

export interface Vaccine {
  system: string;
  code: string;
  display?: string;
  target: TargetDisease[];
}

export interface TargetDisease {
  system: string;
  code: string;
  display?: string;
}

function getIDStringFromIdentifier(id?: Identifier): string | undefined {
  if (id && id.system && id.value) {
    return id.system.toString() + '|' + id.value.toString();
  }
  return undefined;
}

/**
 * Loads the actual document according to metadata from EPR and stores it in the store
 * @param metaData  The CHDocumentReferenceEPR with the metadata for the vaccination record to load
 * @param utils     the utils
 * @param store     the store
 * @returns  A void promise, that is rejected if an error occurs.
 */
export function loadVaccinationRecord(metaData: CHDocumentReferenceEPR, utils: Utils, store: StoreType): Promise<void> {
  store.selectedMetadata = metaData;
  return utils.epdUtils
    .useITI68(metaData)
    .then((resource) => {
      try {
        store.vaccinationRecord = JSON.parse(resource) as CHVacdVaccinationRecordDocument;
        return Promise.resolve();
      } catch (e) {
        console.warn('Fetched a document, but could not parse', e, resource);
        return Promise.reject();
      }
    })
    .catch((e) => {
      console.warn('Loaded document references, but could not fetch document', e, metaData);
      return Promise.reject();
    });
}

/**
 * Fetches the metadata for all available vaccination records from EPR and stores to the store
 * @param utils the utils
 * @param store the store
 * @returns     A void promise, that is rejected if an error occurs.
 */
export function fetchVaccinationMetaData(utils: Utils, store: StoreType): Promise<void> {
  return new Promise((resolve, reject) => {
    utils.epdUtils
      .useITI83(getIdentifierString(store.userResource, store.userSettings.OIDs.local), [store.userSettings.OIDs.mpiId])
      .then((parameters) => {
        const mpiIdentifier = parameters.parameter?.find((p) => p.name === 'targetIdentifier');
        const mpiID = getIDStringFromIdentifier(mpiIdentifier?.valueIdentifier);
        if (!mpiID) {
        } else {
          // with the MPI ID, we can search for document metadata
          utils.epdUtils
            .useITI67({
              status: DocumentReferenceStatus.CURRENT,
              'patient.identifier': mpiID,
              type: VACCINATION_DOCUMENT_TYPE
            })
            .then((res) => {
              // with the "current" status, there should be only one document, in theory
              store.vaccinationMetadata = res.sort((a, b) => (a.date! < b.date! ? 1 : -1));
              store.selectedMetadata = store.vaccinationMetadata[0];
              return resolve();
            })
            .catch((e) => {
              console.warn('Got MPI ID (' + mpiID + '), but could not load document references', e);
              return reject();
            });
        }
      })
      .catch((error) => {
        console.warn('Could not get MPI ID for patient', error);
        return reject();
      });
  });
}
/*
 * Gets a resource that is referenced from a bundle
 * @param   bundle    the Bundle that contains the resource
 * @param   reference the reference string pointing to the resource
 * @return  the referenced resource (or undefined, if nothing was found)
 */
export function getLinkedResource(bundle: Bundle, reference?: string): Resource | undefined {
  if (!reference) return undefined;
  const id = reference.split('/').at(-1);
  return bundle.entry?.find((e) => e.resource?.id === id)?.resource;
}

/*
 * Returns the difference between two dates in full years or days
 * @param type  Wether the difference should be returned as days, weeks, months or as years
 * @param date1 The first date
 * @param date2 The second date (optional, if emmitted, the current date is used for calculation)
 */
export function getTimeDifference(type: 'days' | 'weeks' | 'months' | 'years', date1: Date, date2: Date = new Date()): number {
  let factor;
  switch (type) {
    case 'years':
      factor = 365.25;
      break;
    case 'months':
      factor = 365.25 / 12;
      break;
    case 'weeks':
      factor = 7;
      break;
    case 'days':
      factor = 1;
      break;
  }
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24 * factor)));
}
