import React, { useState } from 'react';
import { Box, Text, VStack, List, ListItem, IconButton } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { registerMemo } from '../lib/api/memo';
import { registerMemoWord } from '../lib/api/memoWord';
import { getMemosByMemoWord } from '../lib/api/memoWord';
import { deleteMemo } from '../lib/api/memo';
import { deleteMemoWord } from '../lib/api/memoWord';
import { updateMemo } from '../lib/api/memo';
import { MemoForm } from './MemoForm';
import { MemoHeader } from './MemoHeader';

const Memo = ({ 
  selectedWord, 
  setSelectedWord, 
  setSelectedRegisteredWord, 
  selectedRegisteredWord, 
  setDisplayedMemos, 
  displayedMemos, 
  setMemoWords,
  startIndex, 
  endIndex, 
  selectedText, 
  addMemoWord, 
  isLoggedIn 
}) => {
  const [memo, setMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [editingMemoId, setEditingMemoId] = useState(null); 
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMemoSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        await handleEditSave();
      } catch (err) {
        console.error(err);
      }
      return;
    }

    if (selectedRegisteredWord) {
      try {
        await registerMemo({
        memo: {
          memo_word_id: selectedRegisteredWord.id,
          body: memo,
        }
      });
      setMemo('');
      const resMemos = await getMemosByMemoWord(`${selectedRegisteredWord.id}`);
      setDisplayedMemos([...resMemos.data]);
      } catch (err) {
        console.error(err);
      }

    } else {
      try {
        const res = await registerMemoWord({
          memo_word: {
            english_text_id: selectedText.id,
            word: selectedWord,
            start_position: startIndex,
            end_position: endIndex
          }
        });
        const wordId = res.data.id;
        await registerMemo({
          memo: {
            memo_word_id: wordId,
            body: memo,
          }
        });
        setMemo('');

        const resMemos = await getMemosByMemoWord(`${wordId}`);
        setDisplayedMemos(prevMemos => [...prevMemos, ...resMemos.data]);

        addMemoWord(res.data);
        setSelectedRegisteredWord(res.data);

      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteSelectedWord = async (wordId) => {
    try {
      await deleteMemoWord(wordId);
      setSelectedRegisteredWord(null);
      setSelectedWord('');
      setDisplayedMemos([]);
      setMemoWords(prevWords => prevWords.filter(word => word.id !== wordId));
    } catch (err) {
      console.error(err);
    }
  }

  const handleDeleteMemo = async (memoId) => {
    try {
      await deleteMemo(memoId);
      setDisplayedMemos(prevMemos => prevMemos.filter(memo => memo.id !== memoId));
    } catch (err) {
      console.error(err);
    }
  }

  const handleEditStart = (memoId, memoBody) => {
    setIsEditing(true);
    setEditingMemoId(memoId);
    setMemo(memoBody);
  };

  const handleEditSave = async () => {
    try {
      await updateMemo({
        id: editingMemoId,
        memo: {
          memo_word_id: selectedRegisteredWord.id,
          body: memo,
        }
      });
      setIsEditing(false);
      setEditingMemoId(null);
      setMemo('');
    } catch (err) {
      console.error(err);
    }

    const resMemos = await getMemosByMemoWord(`${selectedRegisteredWord.id}`);
    setDisplayedMemos([...resMemos.data]);
  };

  
  return isLoggedIn? (
      <VStack 
        as="form" 
        onSubmit={handleMemoSubmit} 
        spacing={0} 
        align="left"
      >
        <Box
          position={"sticky"}
          top="0"
          zIndex={1}
          bg={'#fdfdff'}
          boxShadow="0px 1px 4px rgba(0, 0, 0, 0.1)"
        >
          <MemoHeader
            selectedWord={selectedWord}
            selectedRegisteredWord={selectedRegisteredWord}
            handleDeleteSelectedWord={handleDeleteSelectedWord}
          ></MemoHeader>
        </Box>

        {displayedMemos.length > 0 && (
          <Box py={4}>
            <List 
              styleType="none" 
              height={"calc(100vh - 295px)"} 
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
          </Box>
        )}

        <Box 
          position="sticky" 
          bottom="0"
          zIndex={1}
          px={2}
        >
          <MemoForm
            memo={memo}
            setMemo={setMemo}
            isEditing={isEditing}
          ></MemoForm>
        </Box>
      </VStack>
  ) : null;
};

export default Memo;
