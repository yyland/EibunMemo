import { Box, List, ListItem, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const EnglishTextList = ({ selectedText, setSelectedText, englishTexts, deleteText }) => {

  console.log('englishTexts', englishTexts);

  return (
    <Box display="flex" justifyContent="space-between" mt='12px'>
      <List width="100%" maxHeight="80vh" overflowY="auto">
        {englishTexts.map((text) => (
          <ListItem 
            key={text.id} 
            onClick={() => setSelectedText(text)}
            bg={text === selectedText ? 'gray.200' : null}
            my={1}
            p={2}
            borderRadius="md"
            cursor="pointer"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
              icon={<DeleteIcon  />} 
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                deleteText(text.id);
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EnglishTextList;
