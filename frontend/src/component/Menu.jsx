import EnglishTextList from "./EnglishTextList";
import { useDisclosure, VStack, Box, Link, Icon } from "@chakra-ui/react";
import { AddIcon, UnlockIcon, EditIcon } from "@chakra-ui/icons";
import { SignUpModal } from '../components/SignUpModal';
import { SignInModal } from '../components/SignInModal';

const Menu = ({setEnglishTexts, selectedText, setSelectedComponent, setSelectedText, englishTexts, deleteText }) => {

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
    <VStack spacing={2} align="start" w="100%" maxWidth="800px" bgColor="blue.800">
 
      <VStack spacing={0} align="stretch" w="full" py={4}>
        <Link 
          onClick={onSignUpModalOpen} 
          py={2}
          px={4}
          color="white" 
          _hover={{ textDecoration: 'none', bg: 'blue.700' }}
        >
          <Icon as={AddIcon} mr={2} /> ユーザー登録
        </Link> 
        <Link 
          onClick={onSignInModalOpen} 
          py={2}
          px={4}
          color="white" 
          _hover={{ textDecoration: 'none', bg: 'blue.700' }}
        >
          <Icon as={UnlockIcon} mr={2} /> ログイン
        </Link> 
      </VStack>

      <Box w="max-content" border="0px solid" borderColor="gray.500" borderRadius="md" mx={1}>
        <Link 
          onClick={() => setSelectedComponent('RegisterEnglishText')}
          py={2}
          pl={3}
          color="white" 
          display="block"
          minWidth="230px"
          _hover={{ textDecoration: 'none', bg: 'blue.700' }}
        >
          <Icon as={EditIcon} mr={2} /> New Text
        </Link>
      </Box>

      <Box w="full">
        <EnglishTextList 
          setEnglishTexts={setEnglishTexts} 
          selectedText={selectedText} 
          setSelectedText={setSelectedText} 
          englishTexts={englishTexts} 
        />
      </Box>

      <SignUpModal isOpen={isSignUpModalOpen} onClose={onSignUpModalClose} />
      <SignInModal isOpen={isSignInModalOpen} onClose={onSignInModalClose} />
    </VStack>
  );
};

export default Menu