import React from 'react'
import { Button } from "@chakra-ui/react";


export const SignUpButton = ({onSignUpModalOpen}) => {


  return (

    <Button colorScheme='teal' variant='outline' onClick={onSignUpModalOpen}>
      ユーザー登録 
    </Button>
  )

}



