import React, { useState } from 'react';
import { Button, FormControl, FormLabel, VStack, HStack } from "@chakra-ui/react";
import TextareaAutosize from 'react-textarea-autosize';
import { registerEnglishText } from '../lib/api/englishText';

const RegisterEnglishText = ({setMemoWords, setEnglishTexts, setSelectedText, setSelectedComponent, setSelectedWord, setSelectedRegisteredWord, setDisplayedMemos }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const registerText = async (title, text) => {
    try {
      const res = await registerEnglishText({
        english_text: {
          title: title,
          body: text,
        },
      });
      const newText = res.data;
      setEnglishTexts((prevTexts) => [...prevTexts, newText]);
      setSelectedText(newText);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) {
      return;
    }
    try {
      await registerText(title, text);
      setSelectedWord(null);
      setSelectedRegisteredWord(null);
      setDisplayedMemos([]);
      setMemoWords([]);
      setSelectedComponent('ShowEnglishText');
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <TextareaAutosize
          minRows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          style={{ 
            resize: 'vertical', 
            width: '100%', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            border: '2px solid #e2e8f0',
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Text</FormLabel>
        <TextareaAutosize
          minRows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text..."
          style={{ 
            resize: 'vertical', 
            width: '100%', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            border: '2px solid #e2e8f0',
          }}
        />
      </FormControl>
      <HStack width="100%" justifyContent="flex-end">
        <Button 
          type="submit" 
          colorScheme="blue"
          size="sm"
          backgroundColor="blue.500"
          _hover={{ bg: "blue.600" }}
        >
          Register
        </Button>
      </HStack>
    </VStack>
  );
};

export default RegisterEnglishText;
