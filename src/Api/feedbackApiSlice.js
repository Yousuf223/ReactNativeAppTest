import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {LOG} from '../Utils/helperFunction';
import {endpoints, reducers} from './configs';

export const contactUsApi = createApi({
  reducerPath: reducers.path.contactUs,
  baseQuery,
  endpoints: builder => ({
    add: builder.mutation({
      query: body => {
        LOG('body-inside-api', body);
        return {
          url: endpoints.contactUs.add.url,
          method: endpoints.contactUs.add.method,
          body: body,
        };
      },
    }),
  }),
});

export const {useAddMutation} = contactUsApi;
