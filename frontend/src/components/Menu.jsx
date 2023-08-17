import EnglishTextList from "./EnglishTextList";
import { VStack, Box, Button, Menu as ChakraMenu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { NewTextButton } from '../components/MenuButton';
import { signOut } from '../lib/api/auth.js';
import { useNavigate } from 'react-router-dom';
import { Avatar } from "@chakra-ui/avatar";
import { UnauthenticatedHeader } from "./UnauthenticatedHeader";

const Menu = ({setEnglishTexts, selectedText, setSelectedComponent, setSelectedText, englishTexts, isLoggedIn, setIsLoggedIn, userName }) => {

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
        <UnauthenticatedHeader />
      )}

      {isLoggedIn && (
        <>
          <Box w="full" marginLeft={"0.05em"} marginTop={"2.5"}>
            <NewTextButton setSelectedComponent={setSelectedComponent} />
          </Box>
          <Box height="2px" bgColor="whiteAlpha.100" w="full"></Box>
          <Box w="full">
            <EnglishTextList 
              setEnglishTexts={setEnglishTexts} 
              selectedText={selectedText} 
              setSelectedText={setSelectedText} 
              englishTexts={englishTexts} 
              setSelectedComponent={setSelectedComponent}
            />
          </Box>
        </>
      )}

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
              leftIcon={
                <Avatar 
                  size="xs" 
                  name={userName} 
                  marginLeft={"-0.3em"}
                  color={"whiteAlpha.900"}
                  bgColor="blue.600"
                />
              }
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