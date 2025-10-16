import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './apiConfig';
import { endpoints, reducers } from './configs';
import { LOG } from '../Utils/helperFunction';

export const maintenanceAutopartsApi = createApi({
  reducerPath: reducers.path.maintenanceAutoparts,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: ({ id, body, queryParams, ...otherParams }) => {
        LOG('bodyparams', body);
        LOG('idparams', id);
        LOG('queryParamsparams', queryParams);
        return {
          url: endpoints.maintenanceAutoparts.add.url,
          method: endpoints.maintenanceAutoparts.add.method,
          headers: { 'Content-Type': 'multipart/form-data' },
          body: body,
          params: queryParams,
        };
      },
    }),
    fetchMaintenanceAutopartsByUser: builder.query({
      query: ({ id, queryParams }) => {
        // console.log('queryParams', queryParams);
        return {
          url: endpoints.maintenanceAutoparts.fetchMaintenaceByUser.url,
          method: endpoints.maintenanceAutoparts.fetchMaintenaceByUser.method,
          params: queryParams ? queryParams : {}
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const { useAddMutation, useFetchMaintenanceAutopartsByUserQuery } =
  maintenanceAutopartsApi;
