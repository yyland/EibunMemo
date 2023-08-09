import React from 'react'
import { Button } from "@chakra-ui/react";

export const SignInButton = ({onSignInModalOpen}) => {

  return (
    <Button colorScheme='blue' variant='solid' onClick={onSignInModalOpen}>
      ログイン
    </Button>
  )
}


