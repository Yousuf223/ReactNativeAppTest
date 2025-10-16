import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const vehicleTypesApi = createApi({
  reducerPath: reducers.path.vehicleTypes,
  baseQuery,
  endpoints: builder => ({
    fetchVehicleTypes: builder.query({
      query: parentId => {
        console.log('parentIdparentId', parentId);

        LOG('queryParams-vehicle-types', parentId);
        return {
          url: endpoints.vehicleTypes.fectchVehicleType.url,
          method: endpoints.vehicleTypes.fectchVehicleType.method,
          params: {parentId},
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
    // }),
  }),
});

export const {useFetchVehicleTypesQuery} = vehicleTypesApi;
