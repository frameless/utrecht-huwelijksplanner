/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { huwelijk } from '../models/huwelijk';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * Haal alle huwelijken op
   * Haal alle huwelijken op
   * @returns any OK
   * @throws ApiError
   */
  public static getHuwelijken(): CancelablePromise<{
    results?: Array<huwelijk>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/huwelijken',
    });
  }

  /**
   * Crieër een nieuw huwelijk
   * @param requestBody
   * @returns huwelijk OK
   * @throws ApiError
   */
  public static postHuwelijken(requestBody?: huwelijk): CancelablePromise<huwelijk> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/huwelijken',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Haal één enkel huwelijk op
   * @param id
   * @returns huwelijk OK
   * @throws ApiError
   */
  public static getHuwelijkenId(id: string): CancelablePromise<huwelijk> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/huwelijken/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * Werk een huwelijk bij
   * @param id
   * @returns huwelijk OK
   * @throws ApiError
   */
  public static putHuwelijkenId(id: string): CancelablePromise<huwelijk> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/huwelijken/{id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * Verwijder een huwelijk
   * @param id
   * @returns any OK
   * @throws ApiError
   */
  public static deleteHuwelijkenId(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/huwelijken/{id}',
      path: {
        id: id,
      },
    });
  }
}
