import { createEntityAdapter } from '@reduxjs/toolkit'
import { setAllUsers } from '../../store/slices/users/usersSlice'
import { coreNotesAppApi } from '../coreNotesAppApi'

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApi = coreNotesAppApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setAllUsers(data))
        } catch (err) {
          console.log(err)
        }
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      },
    }),
    addNewUser: builder.mutation({
      query: (user: any) => {
        return {
          url: '/users',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        }
      },
    }),
    updateUser: builder.mutation({
      query: (initialUserData: any) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
