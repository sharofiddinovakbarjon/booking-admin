import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRTK = createApi({
  reducerPath: "apiRTK",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://64.23.200.52/booking/api/v1",
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
  }),
});

export const { useLogInAdminMutation } = apiRTK;
