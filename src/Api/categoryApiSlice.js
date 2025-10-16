import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const categoryApi = createApi({
  reducerPath: reducers.path.category,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.category.add.url,
          method: endpoints.category.add.method,
          body: body,
        };
      },
    }),
    fetchCategories: builder.query({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.category.fetchCategories.url,
          method: endpoints.category.fetchCategories.method,
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
    edit: builder.mutation({
      query: ({id, body}) => {
        return({
        url: `${endpoints.category.edit.url}/${id}`,
        method: endpoints.category.edit.method,
        headers: {'Content-Type': 'multipart/form-data'},
        body: body,
      })},
    }),
    delete: builder.mutation({
      query: ({id}) => ({
        url: `${endpoints.category.delete.url}/${id}`,
        method: endpoints.category.delete.method,
      }),
    })
  }),
});

export const {useAddMutation, useFetchCategoriesQuery, useEditMutation, useDeleteMutation} = categoryApi;
