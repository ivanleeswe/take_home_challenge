import * as React from 'react'
import { useListUsersQuery } from '../services/users'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'
export default function UserList() {

  const { data, error, isLoading } = useListUsersQuery()
  // Individual hooks are also accessible under the generated endpoints:

  const invalidUser = {
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/226.jpg",
    email: "kelsey.wynns@emboldhealth.com",
    firstName: "George",
    id: "invalid-id",
    lastName: "Bluth"
  }
  return (
    <div className="userList">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? <SimpleGrid columns={2} spacing={10}>{[invalidUser, ...data].map(user => (
        <Box>
          <h3>{user.firstName}</h3>
          <h5>ID: {user.id}</h5>
          <img src={user.avatar} alt={user.firstName} />
          <Button colorScheme='red'>Delete</Button>
        </Box>

      ))}
      </SimpleGrid> : null}

    </div>
  )
}