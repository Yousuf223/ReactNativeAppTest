import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiConfig';
import { endpoints, reducers } from './configs';
import { LOG } from '../Utils/helperFunction';

export const recordsApi = createApi({
  reducerPath: reducers.path.records,
  baseQuery,
  endpoints: builder => ({

    fetchRecordsByUser: builder.query({
      query: (params = {}) => {
        LOG('paramsparams', params);
        return {
          url: endpoints.records.fetchchRecordsByUser.url,
          method: endpoints.records.fetchchRecordsByUser.method,
          params: params,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchRecentRecordsExpenses: builder.query({
      query: (params = {}) => {
        LOG('paramsparams', params);
        return {
          url: endpoints.records.fetchRecentRecordsExprenses.url,
          method: endpoints.records.fetchRecentRecordsExprenses.method,
          params: params,
        };
      },
      transformResponse: response => response?.data,
    }),
    deleteRecords: builder.mutation({
      query: ({ id, body }) => {
        const { type } = body || {};

        LOG('ID: ', id);
        LOG('type: ', type);

        return {
          url: `${endpoints.records.deleteRecordsByUser.url}/${id}`,
          method: endpoints.records.deleteRecordsByUser.method,
          params: { type },
        };
      },
      transformResponse: response => response?.data,
    }),

    edit: builder.mutation({
      query: ({ id, body, type }) => {
      
        return({
        url: `${endpoints.records.edit.url}/${id}`,
        method: endpoints.records.edit.method,
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { type },
        body: body,
      })},
    }),
  }),
});

export const {
  useFetchRecordsByUserQuery,
  useFetchRecentRecordsExpensesQuery,
  useDeleteRecordsMutation,
  useEditMutation,
} = recordsApi;
