import React from 'react'
import { Link, Icon } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const SignUpButton = ({onSignUpModalOpen}) => {

  return (
    <Link 
      onClick={onSignUpModalOpen} 
      py={2}
      px={4}
      color="white" 
      _hover={{ textDecoration: 'none', bg: 'blue.700' }}
    >
      <Icon as={AddIcon} mr={2} /> ユーザー登録
    </Link> 
  )
}



