import EnglishTextList from "./EnglishTextList";
import { VStack, Box } from "@chakra-ui/react";
import { NewTextButton } from '../components/MenuButton';
import { UnauthenticatedHeader } from "./UnauthenticatedHeader";
import { UserProfileMenu } from "./UserProfileMenu";

const Menu = ({
  setEnglishTexts, 
  selectedText, 
  setSelectedComponent, 
  setSelectedText, 
  englishTexts, 
  isLoggedIn, 
  setIsLoggedIn, 
  userName,
  setMemoWords,
}) => {

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
              setMemoWords={setMemoWords}
            />
          </Box>
          <Box 
            position="fixed"
            bottom="0"  // VStack の下部に固定
            w="full"
            bgColor="blue.800"
            py={2}
            borderTop="2px solid"
            borderColor="whiteAlpha.100"
          >
            <UserProfileMenu setIsLoggedIn={setIsLoggedIn} userName={userName} />
          </Box>
        </>
      )}
    </VStack>
  );
};

export default Menu