import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const gasApi = createApi({
  reducerPath: reducers.path.gas,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: ({id, body, queryParams, ...otherParams}) => {
        LOG('body-inside-gas-slice', body);
        LOG('id-inside-gas-slice', id);
        LOG('queryParams-inside-gas-slice', queryParams);
        LOG('otherParams-inside-gas-slice', otherParams);
        return {
          url: endpoints.gas.add.url,
          method: endpoints.gas.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
          params: queryParams,
        };
      },
    }),
  }),
});

export const {useAddMutation} = gasApi;
