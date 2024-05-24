import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRTK = createApi({
  reducerPath: "apiRTK",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cafe-booking.uz/booking/api/v1",
  }),
  endpoints: (builder) => ({
    logInAdmin: builder.mutation<{ success: string; token: string }, LoginBody>(
      {
        query: (data) => ({
          url: "/auth/admins-or-superadmins/sign-in/",
          method: "POST",
          body: data,
        }),
      }
    ),

    // Log out
    logOutAdmin: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/admins-or/superadmins/sign-out/",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useLogInAdminMutation, useLogOutAdminMutation } = apiRTK;
