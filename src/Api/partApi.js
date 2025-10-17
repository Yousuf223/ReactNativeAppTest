import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const partApi = createApi({
  reducerPath: reducers.path.part,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-vehicle', body);
        return {
          url: endpoints.part.add.url,
          method: endpoints.part.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchVehicleByUser: builder.query({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.part.getPart.url,
          method: endpoints.part.getPart.method,
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
} = partApi;
