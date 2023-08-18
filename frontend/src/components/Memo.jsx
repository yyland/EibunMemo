import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import { MemoForm } from './MemoForm';
import { MemoHeader } from './MemoHeader';
import { MemoList } from './MemoList';
import { useMemoActions } from '../hooks/useMemoActions';

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
  isLoggedIn 
}) => {

  const {
    inputMemo,
    setInputMemo,
    isEditing,
    handleMemoSubmit,
    handleDeleteWord,
    handleDeleteMemo,
    handleEditStart,
  } = useMemoActions();

  if (!isLoggedIn) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    handleMemoSubmit({
      selectedRegisteredWord,
      selectedWord,
      selectedText,
      startIndex,
      endIndex,
      setDisplayedMemos,
      setSelectedRegisteredWord,
      setMemoWords,
    });
  };

  return (
      <VStack 
        as="form" 
        onSubmit={onSubmit} 
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
            handleDeleteWord={() => handleDeleteWord(
              selectedRegisteredWord.id,
              setSelectedRegisteredWord,
              setSelectedWord,
              setDisplayedMemos,
              setMemoWords
            )}
          ></MemoHeader>
        </Box>

        {displayedMemos.length > 0 ? (
          <Box py={4}>
            <MemoList
              displayedMemos={displayedMemos}
              handleDeleteMemo={(memoId) => handleDeleteMemo(memoId, setDisplayedMemos)}
              handleEditStart={handleEditStart}
              selectedRegisteredWord={selectedRegisteredWord}
            />
          </Box>
        ) : (
          <Box
            height={"calc(100vh - 263px)"}
          ></Box>
        )}

        <Box 
          position="sticky" 
          bottom="0"
          zIndex={1}
          px={2}
        >
          <MemoForm
            memo={inputMemo}
            setMemo={setInputMemo}
            isEditing={isEditing}
          />
        </Box>
      </VStack>
  );
};

export default Memo;
