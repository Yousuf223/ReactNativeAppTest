import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { checkNetworkConnectivity } from '../Utils/helperFunction';
import { baseUrl } from './configs';
import { EventRegister } from 'react-native-event-listeners'
// Create custom baseQuery for network connectivity proper error handling.
const baseQuery = async (args, api, extraOptions) => {
  const isConnected = await checkNetworkConnectivity();

  if (!isConnected) {
    return {
      error: {
        status: 'NO_INTERNET',
        data: { message: 'No internet connection' },
      },
    };
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log('token', token);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // return rawBaseQuery(args, api, extraOptions);
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    EventRegister.emit('forcelogout');
  }

  return result;
};

export { baseQuery };
