import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const mechanicApi = createApi({
  reducerPath: reducers.path.mechanic,
  baseQuery,
  tagTypes: ['Mechanic', 'MechanicById'],
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.mechanic.add.url,
          method: endpoints.mechanic.add.method,
          body: body,
        };
      },
      // invalidatesTags: (result, error, {storeId}) => [
      //   {type: 'StoreById', id: storeId},
      // ],
    }),
    fetchMechanicsByUser: builder.query({
      query: userId => {
        LOG('userId', userId);
        return {
          url: endpoints.mechanic.fetchMechanicsByUser.url,
          method: endpoints.mechanic.fetchMechanicsByUser.method,
        };
      },
      transformResponse: response => response?.data,
      // providesTags: (result, error, id) => [{type: 'Mechanic', id: 'LIST'}],
    }),
    fetchMechanicById: builder.query({
      query: mechanicId => {
        LOG('mechanicId', mechanicId);
        return {
          url: `${endpoints.mechanic.fetchMechanicById.url}/${mechanicId}`,
          method: endpoints.mechanic.fetchMechanicById.method,
        };
      },
      transformResponse: response => response?.data,
      // providesTags: (result, error, id) => [{type: 'MechanicById', id}],
    }),
    edit: builder.mutation({
      query: ({id, body}) => ({
        url: `${endpoints.mechanic.edit.url}/${id}`,
        method: endpoints.mechanic.edit.method,
        body: body,
      }),
      // invalidatesTags: (result, error, {id}) => [{type: 'MechanicById', id}],
    }),
  }),
});

export const {
  useAddMutation,
  useFetchMechanicsByUserQuery,
  useFetchMechanicByIdQuery,
  useEditMutation,
} = mechanicApi;
