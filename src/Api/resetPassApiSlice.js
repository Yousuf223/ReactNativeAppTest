import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';

export const resetApi = createApi({
  reducerPath: 'resetApi',
  baseQuery,
  endpoints: builder => ({
    changePass: builder.mutation({
      query: payload => ({
        url: 'reset/changePassword',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyEmail: builder.mutation({
      query: payload => ({
        url: 'reset/sendVerificationCode',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyCode: builder.mutation({
      query: payload => ({
        url: 'reset/verifyRecoverCode',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPass: builder.mutation({
      query: payload => ({
        url: 'reset/resetPassword',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useChangePassMutation,
  useVerifyEmailMutation,
  useVerifyCodeMutation,
  useResetPassMutation,
} = resetApi;
