import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// https://redux-toolkit.js.org/tutorials/rtk-query
// Define a service using a base URL and expected endpoints

export const baseUrl = '/api'
export const usersUrl = '/users'
const userTag = 'User'

function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }]
}

export const usersApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listUsers: builder.query({
      query: () => usersUrl,
      providesTags: (result) => providesList(result, [userTag]),
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: [userTag], id }]
    }),
    // deleteUser should be rewritten as mutation
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: [userTag], id }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useListUsersQuery, useGetUserQuery, useDeleteUserMutation, useAddUserMutation } = usersApi
