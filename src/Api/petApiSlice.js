import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const petApi = createApi({
  reducerPath: reducers.path.pet,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.pet.add.url,
          method: endpoints.pet.add.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
    }),
    fetchPetByUser: builder.query({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.pet.fectchPetByUser.url,
          method: endpoints.pet.fectchPetByUser.method,
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
  useAddMutation,
  useFetchPetByUserQuery,
  useFetchVehicleByIdQuery,
  useEditMutation,
} = petApi;
