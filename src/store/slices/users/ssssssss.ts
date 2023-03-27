//libraries
import "@reduxjs/toolkit";

import {
  setCategoriesFilter,
  setProductListInfo,
} from "../../store/slices/productListSlice";

//base api call
import { coreDglandApi } from "../coreDglandApi";

//types
import {
  PostProductListInterface,
  CategoriesMetadataInterface,
  ProductListResponseInterface,
  CategoriesFilterResponseInterface,
} from "./categoriesApiType";

const apiWithTag = coreDglandApi.enhanceEndpoints({ addTagTypes: [""] });
export const categoriesApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getCategoriesFilter: build.query<
      CategoriesFilterResponseInterface,
      { categoryslug; brandslug }
    >({
      query: (arg) => {
        const { categoryslug, brandslug } = arg;
        return {
          url: "/api/Catalog/filters/",
          params: { categoryslug, brandslug },
        };
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((res) => {
            dispatch(setCategoriesFilter(res?.data));
          })
          .catch(() => {
            arg;
          });
      },
    }),

    getCategoriesMetadata: build.query<
      CategoriesMetadataInterface,
      { categoryslug; brandslug }
    >({
      query: (arg) => {
        const { categoryslug, brandslug } = arg;
        return {
          url: "/api/Catalog/categorymetadata",
          params: { categoryslug, brandslug },
        };
      },
    }),

    postProductList: build.mutation<
      ProductListResponseInterface,
      PostProductListInterface
    >({
      query(body) {
        return {
          url: `/GetProducts`,
          method: "POST",
          body: body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then((res) => {
            dispatch(setProductListInfo(res?.data?.data));
          })
          .catch(() => {
            arg;
          });
      },
    }),
  }),
});

export const {
  useGetCategoriesFilterQuery,
  usePostProductListMutation,
  endpoints: { getCategoriesFilter },
} = categoriesApi;

export const { getCategoriesMetadata } = categoriesApi.endpoints;
