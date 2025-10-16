import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './apiConfig';
import {endpoints, reducers} from './configs';
import {LOG} from '../Utils/helperFunction';
import {setAuth} from '../Redux/slices/authSlice';

export const profileApi = createApi({
  reducerPath: reducers.path.profile,
  baseQuery,
  endpoints: builder => ({
    update: builder.mutation({
      query: body => {
        LOG('body', body);
        return {
          url: endpoints.profile.update.url,
          method: endpoints.profile.update.method,
          headers: {'Content-Type': 'multipart/form-data'},
          body: body,
        };
      },
      async onQueryStarted(args, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          LOG('PROFILE_DATA_SUCCESS:', data);
          // Dispatch the action to store user in Redux
          dispatch(setAuth({user: data?.data}));
        } catch (error) {
          LOG('PROFILE_DATA_REJECT', error);
        }
      },
    }),
  }),
});

export const {useUpdateMutation} = profileApi;
