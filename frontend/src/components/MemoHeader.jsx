import React from 'react';
import { Box, Text, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const MemoHeader = ({ 
  selectedWord, 
  selectedRegisteredWord, 
  handleDeleteWord 
}) => {
  
  return (
    <Box 
      px={6} 
      pt={7}
      pb={6}
      display="flex" 
      alignItems="left" 
      justifyContent="space-between"
      overflowY="auto"
      bg={'#fdfdff'}
      role={selectedRegisteredWord ? "group" : undefined}
      _hover={{ bg: "#f6f6fc" }}
    >
      <Text fontSize="1.1rem" color="gray.900" fontWeight={'semibold'}>
        {selectedRegisteredWord ? selectedRegisteredWord.word : selectedWord}
      </Text>

      {selectedRegisteredWord && (
        <Menu>
          <MenuButton
            as={IconButton} 
            aria-label="Delete selected word" 
            icon={<CloseIcon />} 
            size="xs"
            opacity="0"
            _groupHover={{ opacity: "0.8" }}
            pointerEvents="auto"
            colorScheme="black"
            variant="outline"
            border={'none'}
          />
          <MenuList>
            <MenuItem 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteWord(selectedRegisteredWord.id);
              }}
            >
              削除する
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  )
}
