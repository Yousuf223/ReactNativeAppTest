import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const accidentApi = createApi({
  reducerPath: reducers.path.accident,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: ({id, body, queryParams, ...otherParams}) => {
        LOG('body', body);
        return {
          url: endpoints.accident.add.url,
          method: endpoints.accident.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
          params: queryParams,
        };
      },
    }),
  }),
});

export const {useAddMutation} = accidentApi;
