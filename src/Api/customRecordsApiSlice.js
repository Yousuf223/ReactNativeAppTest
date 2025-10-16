import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const customRecordsApi = createApi({
  reducerPath: reducers.path.customRecords,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('bodyjdjdjkdjk', body);
        return {
          url: endpoints.customRecords.add.url,
          method: endpoints.customRecords.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    // fetchRecordsByUser: builder.query({
    //   query: (params = {}) => {
    //     LOG('paramsparams', params);
    //     return {
    //       url: endpoints.records.fetchchRecordsByUser.url,
    //       method: endpoints.records.fetchchRecordsByUser.method,
    //       params: params,
    //     };
    //   },
    //   transformResponse: response => response?.data,
    // }),
    // deleteRecords: builder.mutation({
    //   query: ({id, body}) => {
    //     const {type} = body || {};
    //     LOG('ID: ', id);
    //     LOG('type: ', type);
    //     return {
    //       url: `${endpoints.records.deleteRecordsByUser.url}/${id}`,
    //       method: endpoints.records.deleteRecordsByUser.method,
    //       params: {type},
    //     };
    //   },
    //   transformResponse: response => response?.data,
    // }),
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
    edit: builder.mutation({
      query: ({id, body}) => {
        console.log('ididid',id,body)
        return(
        {
        url: `${endpoints.customRecords.edit.url}/${id}`,
        method: endpoints.customRecords.edit.method,
        headers: {'Content-Type': 'multipart/form-data'},
        body: body,
      })},
    }),
    // edit: builder.mutation({
    //   query: ({id, body, type}) => ({
    //     url: `${endpoints.records.edit.url}/${id}`,
    //     method: endpoints.records.edit.method,
    //     headers: {'Content-Type': 'multipart/form-data'},
    //     params: {type},
    //     body: body,
    //   }),
    // }),
  }),
});

export const {useAddMutation, useEditMutation} = customRecordsApi;
