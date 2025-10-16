import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const paymentApi = createApi({
  reducerPath: reducers.path.payment,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.payment.add.url,
          method: endpoints.payment.add.method,
          body: body,
        };
      },
    }),
    fetchPaymentByUser: builder.query({
      query: () => {
        return {
          url: endpoints.payment.fetchPaymentByUser.url,
          method: endpoints.payment.fetchPaymentByUser.method,
        };
      },
      transformResponse: response => response,
    }),
    fetchPaymentByUserID: builder.query({
      query: () => {
        return {
          url: endpoints.payment.fetchPaymentByUserID.url,
          method: endpoints.payment.fetchPaymentByUserID.method,
          // params:{subscriptionId:subscriptionId}
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useFetchPaymentByUserQuery,
  useFetchPaymentByUserIDQuery,
} = paymentApi;
