import React, { useState } from "react";
import { SimpleGrid, useDisclosure, Spinner } from "@chakra-ui/react";
import {
  useListUsersQuery,
  useDeleteUserMutation,
  useGetUserQuery,
} from "../services/users";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "./Card";
import Drawer from "./Drawer";

import "./UserList.css";

export default function UserList() {
  const { data, error, isLoading } = useListUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(0);
  const { currentData } = useGetUserQuery(currentUser);

  // Individual hooks are also accessible under the generated endpoints:

  const invalidUser = {
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/226.jpg",
    email: "kelsey.wynns@emboldhealth.com",
    firstName: "George",
    id: "invalid-id",
    lastName: "Bluth",
  };

  const handleDeleteUser = async (userId) => {
    const deleteuser = await deleteUser(userId);

    if (deleteuser.error) {
      toast(deleteuser.error.data.error);
    }
  };

  const handleViewMoreClick = (userId) => {
    setCurrentUser(userId);
    onOpen();
  };

  return (
    <div className="userList">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={3} spacing={2} className="grid">
          {[invalidUser, ...data].map((user) => {
            return (
              <div key={user.id}>
                <Card
                  user={user}
                  onOpen={onOpen}
                  handleDeleteUser={handleDeleteUser}
                  placement="right"
                  isOpen={isOpen}
                  onClose={onClose}
                  handleViewMoreClick={handleViewMoreClick}
                />
                <Drawer
                  placement="right"
                  user={currentData}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </div>
            );
          })}
        </SimpleGrid>
      )}
    </div>
  );
}
