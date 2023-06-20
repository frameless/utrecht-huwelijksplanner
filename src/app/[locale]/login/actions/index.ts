'use server';

import { redirect } from 'next/navigation';

export const login = async (formData: FormData) => {
  const partnerId = formData.get('partnerId');
  if (partnerId && partnerId !== null) {
    redirect(`/persoonsgegevens/${partnerId}`);
  }
};
