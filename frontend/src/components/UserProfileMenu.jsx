import React from "react";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { signOut } from '../lib/api/auth.js';
import { useNavigate } from 'react-router-dom';

export const UserProfileMenu = ({ setIsLoggedIn, userName }) => {

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await signOut();
      if (res) {
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ChakraMenu>
      <MenuButton
        as={Button}
        leftIcon={
          <Avatar 
            size="xs" 
            name={userName} 
            marginLeft={"-0.8em"}
            color={"whiteAlpha.900"}
            bgColor="blue.600"
          />
        }
        pr={4}
        iconSpacing="0.4em"
        color="white"
        bg="transparent"
        _hover={{ bg: "blue.700" }}
        _active={{ bg: "transparent" }}
      >
        <Text 
          fontSize="md" 
          fontWeight="normal" 
          lineHeight="1.2em" 
          letterSpacing="0.03em"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {userName}
        </Text>
      </MenuButton>
      <MenuList bg="blue.900" borderColor="gray.600" borderWidth="1px" >
        <MenuItem
          color="white"
          bg="transparent"
          py={3}
          pl={8}
          _hover={{ bg: "blue.700"}}
          _expanded={{ bg: "transparent" }}
          onClick={logOut}
        >
          Log Out
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  )
}