import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const vehicleApi = createApi({
  reducerPath: reducers.path.vehicle,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.vehicle.add.url,
          method: endpoints.vehicle.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchVehicleByUser: builder.query({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.vehicle.fectchVehicleByUser.url,
          method: endpoints.vehicle.fectchVehicleByUser.method,
        };
      },
      transformResponse: response => response?.data,
    }),
    fetchVehicleById: builder.query({
      query: vehicleId => {
        LOG('vehicleId', vehicleId);
        return {
          url: `${endpoints.vehicle.fetchVehicleById.url}/${vehicleId}`,
          method: endpoints.vehicle.fetchVehicleById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
    }),
    edit: builder.mutation({
      query: ({id, body}) => ({
        url: `${endpoints.vehicle.edit.url}/${id}`,
        method: endpoints.vehicle.edit.method,
        headers: {'Content-Type': 'multipart/form-data'},
        body: body,
      }),
    }),
    delete: builder.mutation({
      query: vehicleId => {
        LOG('deleteVehicleId', vehicleId);
        return {
          url: `${endpoints.vehicle.delete.url}/${vehicleId}`,
          method: endpoints.vehicle.delete.method || 'DELETE',
        };
      },
      transformResponse: response => response?.data,
    }),
  }),
});

export const {
  useAddMutation,
  useFetchVehicleByUserQuery,
  useFetchVehicleByIdQuery,
  useEditMutation,
  useDeleteMutation,
} = vehicleApi;
