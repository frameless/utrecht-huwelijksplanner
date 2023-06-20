'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { OpenAPI } from '../generated';

const myWindow = typeof window !== 'undefined' ? window : undefined;

export const unauthenticate = (): void => {
  OpenAPI.HEADERS = {};

  myWindow?.sessionStorage.removeItem('JWT');
};

export const authenticate = (JWT: string): void => {
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${JWT}`,
  };

  cookies().set('JWT', JWT);
};

export const isAuthenticated = (): boolean => cookies().has('JWT');

export const getBsnFromJWT = (): string => {
  const JWT = myWindow?.sessionStorage.getItem('JWT');
  const jwtArray = JWT?.split('.');
  if (jwtArray && jwtArray.length >= 2) {
    const jwtJSON = JSON.parse(decodeURIComponent(escape(window.atob(jwtArray[1]))));
    return jwtJSON.person; // BSN
  }
  return '';
};
