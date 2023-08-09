import React, { useState } from 'react';
import { Box, Text, Button, FormControl, FormLabel, Textarea, VStack, List, ListItem, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { registerMemo } from '../lib/api/memo';
import { registerMemoWord } from '../lib/api/memoWord';
import { getMemosByMemoWord } from '../lib/api/memoWord';
import { deleteMemo } from '../lib/api/memo';
import { deleteMemoWord } from '../lib/api/memoWord';

const Memo = ({ selectedWord, setSelectedWord, setSelectedRegisteredWord, selectedRegisteredWord, setDisplayedMemos, displayedMemos, setMemoWords, memoWords, startIndex, endIndex, selectedText, addMemoWord }) => {
  const [memo, setMemo] = useState('');

  const handleMemoSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <VStack as="form" onSubmit={handleMemoSubmit} spacing={0} align="left">
      <FormControl mb={4}>
        <FormLabel fontSize='1.05rem' fontWeight="bold" px={4} py={2} mt={4}>
          Selected Words
        </FormLabel>
        <Box 
          borderWidth="0px" 
          borderRadius="md" 
          px={6} 
          display="flex" 
          alignItems="left" 
          justifyContent="space-between"
          position="relative"
          role={selectedRegisteredWord ? "group" : undefined}
        >
          <Text fontSize="1.05rem" color="gray.900">
            {selectedRegisteredWord ? selectedRegisteredWord.word : selectedWord}
          </Text>
          {selectedRegisteredWord && (
            <IconButton 
              aria-label="Delete selected word" 
              icon={<CloseIcon />} 
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSelectedWord(selectedRegisteredWord.id);
              }}
              opacity="0"
              _groupHover={{ opacity: "0.8" }}
              pointerEvents="auto"
              colorScheme="black"
              variant="outline"
              border={'none'}
            />
          )}
        </Box>
      </FormControl>

      <Text mb={2} fontSize='1.05rem' fontWeight="bold" px={4} py={2}>
        Memos
      </Text>
      {displayedMemos.length > 0 && (
        <Box mb={4}>
          <List styleType="none">
            {displayedMemos.map((memoObj, index) => (
              <ListItem key={index}>
              <Box 
                borderWidth="0px" 
                borderRadius="md" 
                px={6} 
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
                <Text fontSize="1.05rem">
                  {memoObj.body}
                </Text>
                <IconButton 
                  aria-label="Delete memo" 
                  icon={<CloseIcon />} 
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMemo(memoObj.id);
                  }}
                  opacity="0"
                  _groupHover={{ opacity: "0.8" }}
                  pointerEvents="auto"
                  colorScheme="black"
                  variant="outline"
                  border={'none'}
                />
              </Box>
            </ListItem>
            
            ))}
          </List>
        </Box>
      )}
      <FormControl my={4}>
        <Textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
      </FormControl>
      <Button type="submit">Register</Button>
    </VStack>
  );
};

export default Memo;
