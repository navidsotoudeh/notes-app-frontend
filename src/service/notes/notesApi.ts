import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder: any) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      // transformResponse: (responseData: any) => {
      //   console.log("responseData,", responseData);
      //   const loadedNotes = responseData.map((note) => {
      //     note.id = note._id;
      //     return note;
      //   });
      //   return notesAdapter.setAll(initialState, loadedNotes);
      // },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (note) => {
        return {
          url: "/notes",
          method: "POST",
          body: note,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    updateNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
