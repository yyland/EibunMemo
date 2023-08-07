import React from 'react'
import { Button } from "@chakra-ui/react";


export const SignInButton = ({onSignInModalOpen}) => {


  return (

    <Button colorScheme='teal' variant='outline' onClick={onSignInModalOpen}>
      ログイン
    </Button>
  )

}


