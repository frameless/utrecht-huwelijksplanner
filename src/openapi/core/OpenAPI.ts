/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: 'include' | 'omit' | 'same-origin';
  TOKEN?: string | Resolver<string>;
  USERNAME?: string | Resolver<string>;
  PASSWORD?: string | Resolver<string>;
  HEADERS?: Headers | Resolver<Headers>;
  ENCODE_PATH?: (path: string) => string;
};

export const getOpenAPI = (JWT?: string | null): OpenAPIConfig => {
  let config: OpenAPIConfig = {
    BASE: process.env.NEXT_PUBLIC_API_URL ?? '',
    VERSION: '1.0',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    ENCODE_PATH: undefined,
  };

  if (JWT) {
    config = { ...config, HEADERS: { Authorization: `Bearer ${JWT}` } };
  }

  return config;
};
