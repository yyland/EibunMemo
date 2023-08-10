import EnglishTextList from "./EnglishTextList";
import { useDisclosure, VStack, Box, Button, Menu as ChakraMenu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { SignUpModal } from '../components/SignUpModal';
import { SignInModal } from '../components/SignInModal';
import { SignInButton, SignUpButton, SignOutButton, NewTextButton } from '../components/MenuButton';
import { signOut } from '../lib/api/auth.js';
import { useNavigate } from 'react-router-dom';

const Menu = ({setEnglishTexts, selectedText, setSelectedComponent, setSelectedText, englishTexts, deleteText, isLoggedIn, setIsLoggedIn, userName }) => {

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

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const res = await signOut();
      if (res) {
        console.log('res: ', res);
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <VStack 
      spacing={2} 
      align="start" 
      w="100%" 
      maxWidth="400px" 
      bgColor="blue.800" 
      position="relative" 
      overflow="hidden"
    >

      {!isLoggedIn && (
        <>
          <Box height="2px" w="full"></Box>
          <VStack spacing={0} align="stretch" w="full">
            <SignUpButton onSignUpModalOpen={onSignUpModalOpen} />
            <SignInButton onSignInModalOpen={onSignInModalOpen} />
          </VStack>
          <SignUpModal isOpen={isSignUpModalOpen} onClose={onSignUpModalClose} />
          <SignInModal isOpen={isSignInModalOpen} onClose={onSignInModalClose} />
        </>
      )}

      <Box height="2px" bgColor="whiteAlpha.100" w="full"></Box>

      <Box w="full">
        <NewTextButton setSelectedComponent={setSelectedComponent} />
      </Box>

      <Box height="2px" bgColor="whiteAlpha.100" w="full"></Box>

      <Box w="full">
        <EnglishTextList 
          setEnglishTexts={setEnglishTexts} 
          selectedText={selectedText} 
          setSelectedText={setSelectedText} 
          englishTexts={englishTexts} 
        />
      </Box>

      {isLoggedIn && (
        <Box 
          position="fixed"
          bottom="0"  // VStack の下部に固定
          w="full"
          bgColor="blue.800"
          py={2}
          borderTop="2px solid"
          borderColor="whiteAlpha.100"
        >
          <ChakraMenu>
            <MenuButton
              as={Button}
              leftIcon={<SettingsIcon boxSize="0.8em" marginTop="0.125em" marginRight={"0.25em"} marginLeft={"0.11em"} />}
              pr={6}
              iconSpacing="0.6em"
              color="white"
              bg="transparent"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
              _active={{ bg: "transparent" }}
            >
              <Text fontSize="md" fontWeight="normal" lineHeight="1.2em" letterSpacing="0.05em">
                {userName}
              </Text>
            </MenuButton>
            <MenuList bg="blue.900" borderColor="gray.600" borderWidth="1px" padding={0}>
              <MenuItem
                color="white"
                bg="transparent"
                py={3}
                pl={9}
                _hover={{ bg: "rgba(255, 255, 255, 0.1)"}}
                _expanded={{ bg: "transparent" }}
                onClick={logOut}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </ChakraMenu>
        </Box>
      )}


    </VStack>
  );
};

export default Menu