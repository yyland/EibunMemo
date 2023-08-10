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
        >
          <Text fontSize="1.1rem" color="gray.900" fontWeight={'semibold'}>
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
      </Box>

      {displayedMemos.length > 0 && (
        <Box py={4}>
          <List 
            styleType="none" 
            height={"calc(100vh - 320px)"} 
            overflowY={'auto'}
          >
            {displayedMemos.map((memoObj, index) => (
              <ListItem key={index}>
              <Box 
                borderWidth="0px" 
                borderRadius="md" 
                pl={5} 
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
                  whiteSpace="normal"
                  textAlign="justify"  
                  pr={2}
                >
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

      <Box 
        position="sticky" 
        bottom="0"
        zIndex={1}
        px={2}
      >
        <FormControl mb={2}>
          <Textarea 
            value={memo} 
            onChange={(e) => setMemo(e.target.value)} 
            size="lg"  
            height="150px" 
            width="100%"  
        />
        </FormControl>

        <Box textAlign="right" mr={2}>
          <Button 
            type="submit" 
            colorScheme="blue"
            size="sm"
            backgroundColor="blue.500"
            _hover={{ bg: "blue.600" }} 
          >
            Register
          </Button>
        </Box>
      </Box>
    </VStack>
  );
};

export default Memo;
