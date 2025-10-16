import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const equipmentApi = createApi({
  reducerPath: reducers.path.equipment,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.equipment.add.url,
          method: endpoints.equipment.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    // fetchVehicleByUser: builder.query({
    //   query: body => {
    //     LOG('body', body);
    //     return {
    //       url: endpoints.vehicle.fectchVehicleByUser.url,
    //       method: endpoints.vehicle.fectchVehicleByUser.method,
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
  useAddMutation,
  useFetchVehicleByUserQuery,
  useFetchVehicleByIdQuery,
  useEditMutation,
} = equipmentApi;
