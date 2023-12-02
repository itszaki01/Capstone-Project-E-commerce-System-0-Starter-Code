import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
    reducerPath:'api',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({})
})