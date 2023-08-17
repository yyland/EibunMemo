import { Box, List, ListItem, IconButton, Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { deleteEnglishText } from "../lib/api/englishText";

const EnglishTextList = ({ setEnglishTexts, selectedText, setSelectedText, englishTexts, setSelectedComponent }) => {
  
  const deleteText = async (id) => {
    try {
      await deleteEnglishText(id);
      setEnglishTexts((prevTexts) => prevTexts.filter((prevText) => prevText.id !== id));
      if (englishTexts.length > 0) {
        setSelectedText(englishTexts[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      height="calc(100vh - 135px)"
    >
      <List 
        width="100%" 
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#718096',
            borderRadius: '5px',
          },
          /* Firefox */
          scrollbarWidth: 'thin',
          scrollbarColor: '#718096 transparent',
        }}
      >
        {englishTexts.map((text) => (
          <ListItem 
            key={text.id} 
            color="white"
            width="100%"
            onClick={() => {
              setSelectedText(text);
              setSelectedComponent('ShowEnglishText');
            }}
            bg={text.id === selectedText?.id ? 'blue.700' : 'blue.800'}
            _hover={{ bg: 'blue.700' }}
            my={0}
            py={2}
            px={4}
            cursor="pointer"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            role="group"  // ListItemがhoverされたときに表示
            position="relative"
          >
            <Icon viewBox='0 0 200 200' boxSize='9px' color='gray.400' mr={4} ml={1}>
              <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
              />
            </Icon>
            <Box
              flex="1"
              minW="0"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {text.title}
            </Box>
            <IconButton 
              aria-label="Delete text" 
              icon={<CloseIcon />} 
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                deleteText(text.id);
              }}

              opacity="0"
              _groupHover={{ opacity: "0.8" }}  // ListItemがhoverされたときに表示
              pointerEvents="auto"  // ListItemがhoverされていないときでもクリック可能にする
              colorScheme="white"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EnglishTextList;
