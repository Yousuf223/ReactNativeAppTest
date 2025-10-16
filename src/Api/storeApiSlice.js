import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';

export const storeApi = createApi({
  reducerPath: reducers.path.store,
  baseQuery,
  tagTypes: ['Store', 'StoreById'],
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.store.add.url,
          method: endpoints.store.add.method,
          body: body,
        };
      },
    }),
    addMechanicsSellers: builder.mutation({
      query: ({id, body}) => {
        LOG('idid', id);
        LOG('bodybody', body);
        return {
          url: `${endpoints.store.addMechanicsSellers.url}/${id}`,
          method: endpoints.store.addMechanicsSellers.method,
          body: body,
        };
      },
      // invalidatesTags: (result, error, {id}) => [{type: 'StoreById', id}],
    }),
    fetchStoreById: builder.query({
      query: storeId => {
        LOG('storeId', storeId);
        return {
          url: `${endpoints.store.fetchStoreById.url}/${storeId}`,
          method: endpoints.store.fetchStoreById.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
      // providesTags: (result, error, id) => [{type: 'StoreById', id}],
    }),
    fetchStoreByUserId: builder.query({
      query: storeId => {
        return {
          url: `${endpoints.store.fectchStoreByUser.url}`,
          method: endpoints.store.fectchStoreByUser.method || 'GET',
        };
      },
      transformResponse: response => response?.data,
      // providesTags: (result, error, id) => [{type: 'Store', id: 'LIST'}],
    }),
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
  useAddMechanicsSellersMutation,
  useFetchStoreByIdQuery,
  useFetchStoreByUserIdQuery,
} = storeApi;
