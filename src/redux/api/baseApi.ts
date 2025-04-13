// Need to use the React-specific entry point to import createApi
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { logout, setUser } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = ((getState() as RootState).auth as any).token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // Check if the error exists and if the data is an object with a message
  if (result.error?.status === 400) {
    const errorData = result.error.data;
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      // Now you can safely access the message
      toast.error((errorData as { message: string }).message);
    }
  }

  if (result?.error?.status === 401) {
    //The code sends a POST request to /auth/refresh-token to obtain a new access token, using credentials: "include" to include the refresh token stored in cookies.
    const res = await fetch("http://localhost:5000/api/v1", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json(); //Parsing the server's JSON response into a usable JavaScript object.

    if (data?.data?.accessToken) {
      const user = ((api.getState() as RootState).auth as any).user;
      api.dispatch(setUser({ user, token: data?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    }
  } else {
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
