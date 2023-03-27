import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { setAllUsers } from "../../store/slices/users/usersSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder: any) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // transformResponse: (responseData) => {
      //   const loadedUsers = responseData.map((user) => {
      //     user.id = user._id;
      //     return user;
      //   });
      //   return usersAdapter.setAll(initialState, loadedUsers);
      // },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllUsers(data));
        } catch (err) {
          console.log(err);
        }
      },
      // transformResponse: (responseData: any) => {
      //   console.log("responseData,", responseData);
      //   const loadedUsers = responseData.map((user) => {
      //     user.id = user._id;
      //     return user;
      //   });
      //   return usersAdapter.setAll(initialState, loadedUsers);
      // },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (user) => {
        return {
          url: "/users",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
