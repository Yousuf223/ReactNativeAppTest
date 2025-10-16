import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const autopartsApi = createApi({
  reducerPath: reducers.path.autoparts,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: ({id, body, queryParams}) => {
        LOG('body', body);
        return {
          url: endpoints.autoparts.add.url,
          method: endpoints.autoparts.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
          params: queryParams,
        };
      },
    }),
  }),
});

export const {useAddMutation} = autopartsApi;
