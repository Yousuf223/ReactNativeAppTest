import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const otherRecordsApi = createApi({
  reducerPath: reducers.path.otherRecords,
  baseQuery,
  endpoints: builder => ({
    // add: builder.mutation({
    //   query: body => {
    //     LOG('body', body);
    //     return {
    //       url: endpoints.equipment.add.url,
    //       method: endpoints.equipment.add.method,
    //       headers: {'Content-Type': 'multipart/form-data'},
    //       body: body,
    //     };
    //   },
    // }),
    fetchOtherRecordsByUser: builder.query({
      query: (params = {}) => {
        LOG('paramsparams', params);
        return {
          url: endpoints.otherRecords.fetchchOtherRecordsByUser.url,
          method: endpoints.otherRecords.fetchchOtherRecordsByUser.method,
          params: params,
        };
      },
      transformResponse: response => response?.data,
    }),
    // fetchVehicleById: builder.query({
    //   query: vehicleId => {
    //     LOG('vehicleId', vehicleId);
    //     return {
    //       url: `${endpoints.vehicle.fetchVehicleById.url}/${vehicleId}`,
    //       method: endpoints.vehicle.fetchVehicleById.method || 'GET',
    //     };
    //   },
    //   transformResponse: response => response?.data,
    //   providesTags: (result, error, id) => [{id}],
    // }),
    // edit: builder.mutation({
    //   query: ({id, body}) => ({
    //     url: `${endpoints.vehicle.edit.url}/${id}`,
    //     method: endpoints.vehicle.edit.method,
    //     headers: {'Content-Type': 'multipart/form-data'},
    //     body: body,
    //   }),
    // }),
  }),
});

export const {
  useFetchOtherRecordsByUserQuery,

  //   useLazyFetchOtherRecordsByUserQuery,
  //   useAddMutation,
  //   useFetchVehicleByIdQuery,
  //   useEditMutation,
} = otherRecordsApi;
