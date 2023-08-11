import React from 'react'
import { Link, Icon } from "@chakra-ui/react";
import { AddIcon, UnlockIcon, EditIcon } from "@chakra-ui/icons";

export const SignUpButton = ({onSignUpModalOpen}) => {
  return (
    <Link 
      onClick={onSignUpModalOpen} 
      py={3}
      px={4}
      color="white" 
      _hover={{ textDecoration: 'none', bg: 'blue.700' }}
    >
      <Icon as={AddIcon} mr={2} /> ユーザー登録
    </Link> 
  )
}

export const SignInButton = ({onSignInModalOpen}) => {
  return (
    <Link 
      onClick={onSignInModalOpen} 
      py={3}
      px={4}
      color="white" 
      _hover={{ textDecoration: 'none', bg: 'blue.700' }}
    >
      <Icon as={UnlockIcon} mr={2} /> ログイン
    </Link> 
  )
}

export const SignOutButton = ({onSignOut}) => {
  return (
    <Link 
      onClick={onSignOut} 
      py={2}
      px={4}
      color="white" 
      _hover={{ textDecoration: 'none', bg: 'blue.700' }}
    >
      <Icon as={UnlockIcon} mr={2} /> ログアウト
    </Link> 
  )
}

export const NewTextButton = ({setSelectedComponent}) => {
  return (
    <Link 
      onClick={() => setSelectedComponent('RegisterEnglishText')}
      mt={0}
      pt={3}
      pb={3}
      pl={4}
      pr={4}
      color="white" 
      display="block"
      _hover={{ textDecoration: 'none', bg: 'blue.700' }}
    >
      <Icon as={EditIcon} mr={2} /> New Text
    </Link>
  )
}