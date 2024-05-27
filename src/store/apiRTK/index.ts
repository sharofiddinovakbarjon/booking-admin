import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRTK = createApi({
  reducerPath: "apiRTK",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cafe-booking.uz/api/v1",
  }),
  endpoints: (builder) => ({
    // ==========================================================

    // Log in
    logInAdmin: builder.mutation<{ success: string; token: string }, LoginBody>(
      {
        query: (data) => ({
          url: "/users/admin-or-superadmin/auth/sign-in/",
          method: "POST",
          body: data,
        }),
      }
    ),

    // Log out
    logOutAdmin: builder.mutation<any, void>({
      query: () => ({
        url: "/users/admin-or/superadmin/sign-out/",
        method: "POST",
        body: {},
      }),
    }),

    // Get User
    getUser: builder.query<GetUserRes, string>({
      query: (token) => ({
        url: "/users/get-user/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    // Get Admin's Cafe
    getCafe: builder.query<any, string>({
      query: (token) => ({
        url: "/cafes/get-cafe/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    // ----------------------------------------------------
  }),
});

export const {
  useLogInAdminMutation,
  useLogOutAdminMutation,
  useGetUserQuery,
  useGetCafeQuery,
} = apiRTK;
