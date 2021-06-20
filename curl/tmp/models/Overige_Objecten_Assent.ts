/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Bassed on https://github.com/ConductionNL/instemming-registratie-component/blob/master/api/src/Entity/Assent.php
 */
export type Overige_Objecten_Assent = {
  id?: string;
  /**
   * A secret token used to validate the assent
   */
  token?: string;
  /**
   * The name of this assend is displayed as a title to end users and should make clear what they arre assending to
   */
  name: string;
  /**
   * The description of this assend is displayed to end users as aditional information and should make clear what they arre assending to
   */
  description?: string;
  /**
   * The request that this assent applies to
   */
  request?: string;
  /**
   * The request that this assent applies to
   */
  'forwardUrl;'?: string;
  /**
   * The property of a request that this assent applies to e.g. parner in meldingvoorgenomenhuwelijk
   */
  property?: string;
  /**
   * The process that this assent originated from
   */
  process?: string;
  /**
   * The contact that this assent applies to
   */
  contact?: string;
  /**
   * The person that this assent applies to
   */
  person?: string;
  /**
   * The status of this assent e.g. requested, granted, declined, cancelled, withdrawn
   */
  status?: Overige_Objecten_Assent.status;
  /**
   * The organisation (RSIN) or person (BSN) that is responsible for making this assent
   */
  requester: string;
  revocable?: boolean;
};

export namespace Overige_Objecten_Assent {
  /**
   * The status of this assent e.g. requested, granted, declined, cancelled, withdrawn
   */
  export enum status {
    REQUESTED = 'requested',
    GRANTED = 'granted',
    SUBMITTED = 'submitted',
    DECLINED = 'declined',
    CANCELLED = 'cancelled',
    WITHDRAWN = 'withdrawn',
  }
}
