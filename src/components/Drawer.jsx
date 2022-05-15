import React from "react";
import { Button } from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

const DrawerComponent = ({ placement, user, isOpen, onClose }) => {
  return (
    <>
      {user ? (
        <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <p>{user.id}</p>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.email}</p>
              <img src={user.avatar} />
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </>
  );
};

export default DrawerComponent;
