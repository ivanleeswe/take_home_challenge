import React from "react";
import { Box, Button } from "@chakra-ui/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Card.css";

const Card = ({ user, handleDeleteUser, handleViewMoreClick }) => {
  return (
    <Box className="box">
      <h3>{user.firstName}</h3>
      <h5>ID: {user.id}</h5>
      <img src={user.avatar} alt={user.firstName} />
      <Button
        colorScheme="teal"
        onClick={() => handleViewMoreClick(user.id)}
        className="viewButton"
      >
        View More
      </Button>
      <Button onClick={() => handleDeleteUser(user.id)} colorScheme="red">
        Delete
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default Card;
