import Cookies from 'js-cookie';
import client from './client';

export const signUp = (params) => {
  return client.post('auth', params);
};

export const signIn = (params) => {
  return client.post('auth/sign_in', params);
};

export const signOut = () => {
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const getUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) {
    return;
  }

  const res = client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
  return res;
};

export const createGuestUser = () => {
  return client.post('auth/create_guest');
};
