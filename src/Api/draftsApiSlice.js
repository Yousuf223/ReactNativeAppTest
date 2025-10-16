import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';
export const draftsApi = createApi({
  reducerPath: reducers.path.drafts,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.drafts.add.url,
          method: endpoints.drafts.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchDraftRecordsByUser: builder.query({
      query: (params = {}) => {
        LOG('paramsparams', params);
        return {
          url: endpoints.drafts.fetchRecordsByUser.url,
          method: endpoints.drafts.fetchRecordsByUser.method,
          params: params,
        };
      },
      transformResponse: response => response?.data,
    }),
    deleteDraftRecords: builder.mutation({
      query: ({id}) => {
        LOG('ID: ', id);
        return {
          url: `${endpoints.drafts.deleteRecordsByUser.url}/${id}`,
          method: endpoints.drafts.deleteRecordsByUser.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchDraftRecordsById: builder.query({
      query: draftId => {
        LOG('draftId', draftId);
        return {
          url: `${endpoints.drafts.fetchRecordsById.url}/${draftId}`,
          method: endpoints.drafts.fetchRecordsById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
      // providesTags: (result, error, id) => [{id}],
    }),
    // edit: builder.mutation({
    //   query: ({id, body}) => ({
    //     url: `${endpoints.records.edit.url}/${id}`,
    //     method: endpoints.records.edit.method,
    //     headers: {'Content-Type': 'multipart/form-data'},
    //     body: body,
    //   }),
    // }),
  }),
});
export const {
  useAddMutation,
  useFetchDraftRecordsByUserQuery,
  useDeleteDraftRecordsMutation,
} = draftsApi;
