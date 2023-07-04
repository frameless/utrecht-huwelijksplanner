'use server';

import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { cookies } from 'next/headers';
import { OpenAPI } from '../generated';

interface User {
  userId: string;
  username: string;
  organization: string;
  locale: string;
  roles: string[];
  session: string;
  iss: string;
  ias: number;
  exp: number;
  person: string;
}

export const unauthenticate = (): void => {
  OpenAPI.HEADERS = {};
  cookies().delete('JWT')
};

export const authenticate = (JWT: string): void => {
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${JWT}`,
  };

  cookies().set('JWT', JWT);
};

export const isAuthenticated = (): boolean => cookies().has('JWT');

export const getBsnFromJWT = (): string | null => {
  const JWT = cookies().get('JWT')?.value;
  const jwtArray = JWT?.split('.');
  if (!jwtArray) return null

  const decoded = jwt_decode<User>(JWT as string);
  return decoded.person; // BSN
};
