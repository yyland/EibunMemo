import EnglishTextList from "./EnglishTextList";
import { VStack, HStack, Box } from "@chakra-ui/react";
import { NewTextButton } from '../components/MenuButton';
import { UnauthenticatedHeader } from "./UnauthenticatedHeader";
import { UserProfileMenu } from "./UserProfileMenu";
import WordList from "./WordList";
import { ModeSelectMenu } from "./ModeSelectMenu";

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
  selectedRegisteredWord,
  setSelectedRegisteredWord,
  mode,
  setMode,
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
          {mode === "text" ? (
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
            </>
          ) : (
            <>
              <Box height="2px" bgColor="whiteAlpha.100" w="full"></Box>
              <Box w="full">
                <WordList
                  setSelectedText={setSelectedText} 
                  setSelectedComponent={setSelectedComponent}
                  selectedRegisteredWord={selectedRegisteredWord}
                  setSelectedRegisteredWord={setSelectedRegisteredWord}
                  setMemoWords={setMemoWords}
                />
              </Box>
            </>
          )}

          <Box 
            position="fixed"
            bottom="0"
            w="330px"
            bgColor="blue.800"
            py={2}
            borderTop="2px solid"
            borderColor="whiteAlpha.100"
          >
            <HStack spacing={6} justifyContent="space-between" pl={"4px"} pr={4}>
              <UserProfileMenu setIsLoggedIn={setIsLoggedIn} userName={userName} />
              <ModeSelectMenu mode={mode} setMode={setMode} />
            </HStack>
          </Box>

        </>
      )}
    </VStack>
  );
};

export default Menu