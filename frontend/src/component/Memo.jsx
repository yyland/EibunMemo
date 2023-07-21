import React, { useState } from 'react';
import { Box, Text, Button, FormControl, FormLabel, Textarea, VStack, List, ListItem } from "@chakra-ui/react";
import axios from 'axios';

const Memo = ({ selectedWord, selectedRegisteredWord, setDisplayedMemos, displayedMemos, startIndex, endIndex, selectedText, addMemoWord }) => {
  const [memo, setMemo] = useState('');

  const handleMemoSubmit = async (e) => {
    e.preventDefault();
    if (selectedRegisteredWord) {
      try {
        await axios.post('http://localhost:3010/api/memos', {
        memo: {
          memo_word_id: selectedRegisteredWord.id,
          memo: memo,
        }
      });
      setMemo('');
      const resMemos = await axios.get(`http://localhost:3010/api/memo_words/${selectedRegisteredWord.id}/memos`);
      setDisplayedMemos([...resMemos.data]);
      } catch (err) {
        console.error(err);
      }

    } else {
      try {
        const res = await axios.post('http://localhost:3010/api/memo_words', {
          memo_word: {
            english_text_id: selectedText.id,
            word: selectedWord,
            start_position: startIndex,
            end_position: endIndex
          }
        });
        const wordId = res.data.id;
        await axios.post('http://localhost:3010/api/memos', {
          memo: {
            memo_word_id: wordId,
            memo: memo,
          }
        });
        setMemo('');

        const resMemos = await axios.get(`http://localhost:3010/api/memo_words/${wordId}/memos`);
        setDisplayedMemos(prevMemos => [...prevMemos, ...resMemos.data]);

        addMemoWord(res.data);

      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <VStack as="form" onSubmit={handleMemoSubmit} spacing={0} align="left">
      <FormControl mb={4}>
        <FormLabel fontSize='md' fontWeight="bold">
          Selected Word
        </FormLabel>
        <Box borderWidth="0px" borderRadius="md" p={2} display="flex" alignItems="left">
          <Text fontSize="md" color="gray.900">
            {selectedRegisteredWord ? selectedRegisteredWord.word : selectedWord}
          </Text>
        </Box>
      </FormControl>
      <Text mb={2} fontSize='md' fontWeight="bold">
        Memos
      </Text>
      {displayedMemos.length > 0 && (
        <Box mb={4}>
          <List styleType="none">
            {displayedMemos.map((memoObj, index) => (
              <ListItem key={index}>
                <Box borderWidth="0px" borderRadius="md" p={2} display="flex" alignItems="left" wordBreak="break-word">
                  {memoObj.memo}
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
