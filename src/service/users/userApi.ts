import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder: any) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
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
  }),
});

export const { useAddNewUserMutation, useGetUsersQuery } = usersApi;
