import { Box, VStack } from "@chakra-ui/layout";
import { SignUpButton, SignInButton } from "./MenuButton";
import { SignUpModal } from './SignUpModal';
import { SignInModal } from './SignInModal';
import { useDisclosure } from "@chakra-ui/hooks";

export const UnauthenticatedHeader = () => {

  const {
    isOpen: isSignUpModalOpen,
    onOpen: onSignUpModalOpen,
    onClose: onSignUpModalClose,
  } = useDisclosure();

  const {
    isOpen: isSignInModalOpen,
    onOpen: onSignInModalOpen,
    onClose: onSignInModalClose,
  } = useDisclosure();

  return (
    <>
      <Box height="2px" w="full"></Box>
      <VStack spacing={0} align="stretch" w="full">
        <SignUpButton onSignUpModalOpen={onSignUpModalOpen} />
        <SignInButton onSignInModalOpen={onSignInModalOpen} />
      </VStack>
      <SignUpModal isOpen={isSignUpModalOpen} onClose={onSignUpModalClose} />
      <SignInModal isOpen={isSignInModalOpen} onClose={onSignInModalClose} />
    </>
  )
}