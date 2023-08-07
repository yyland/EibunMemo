import Cookies from 'js-cookie';
import client from './client';

export const signUp = (params) => {
  return client.post('auth', params);
};
export const signIn = (params) => {
  return client.post('auth/sign_in', params);
};
export const getUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) {
    console.log('getUser: no token');
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
