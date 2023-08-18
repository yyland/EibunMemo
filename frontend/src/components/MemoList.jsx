import React from 'react';
import { useState } from 'react';
import { Box, Text, List, ListItem, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export const MemoList = ({
  displayedMemos,
  handleEditStart,
  handleDeleteMemo,
  selectedRegisteredWord,
}) => {

  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <List 
      styleType="none" 
      height={"calc(100vh - 300px)"} 
      overflowY={'auto'}
    >
      {displayedMemos.map((memoObj, index) => (
        <ListItem key={index}>
        <Box 
          borderWidth="0px" 
          borderRadius="md" 
          pl={5}
          pr={1} 
          py={2}
          display="flex" 
          alignItems="left" 
          justifyContent="space-between"
          position="relative"
          role="group"
          wordBreak="break-word"
          _hover={{
            backgroundColor: "#f6f6fc",
          }}
        >
          <Text 
            fontSize="1.05rem"
            width="100%"
            whiteSpace="pre-wrap"
            textAlign="justify"  
            pr={1}
          >
            {memoObj.body}
          </Text>
          
          {selectedRegisteredWord && (
            <Menu 
              isOpen={openMenuId === memoObj.id} 
              onClose={() => setOpenMenuId(null)}
            >
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<EditIcon />}
                size="sm"
                opacity="0"
                _groupHover={{ opacity: "0.8" }}
                pointerEvents="auto"
                colorScheme="black"
                variant="outline"
                border={'none'}
                onClick={() => setOpenMenuId(memoObj.id)}
              />
              <MenuList>
                <MenuItem onClick={() => {
                  handleEditStart(memoObj.id, memoObj.body);
                  setOpenMenuId(null);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMemo(memoObj.id);
                  setOpenMenuId(null);
                }}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
            )
          }
        </Box>
      </ListItem>
      ))}
    </List>

  )
}
