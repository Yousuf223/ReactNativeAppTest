import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {setAuth} from '../Redux/slices/authSlice';

export const authApi = createApi({
  reducerPath: reducers.path.auth,
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: endpoints.auth.login.url,
        method: endpoints.auth.login.method,
        body: credentials,
      }),
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('data', data);
          // Dispatch the action to store user and token in Redux
          dispatch(setAuth({user: data?.data?.user, token: data?.data?.token}));
        } catch (error) {
          console.log('Login failed', error);
        }
      },
    }),
    register: builder.mutation({
      query: userInfo => ({
        url: endpoints.auth.register.url,
        method: endpoints.auth.register.method,
        body: userInfo,
      }),
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
