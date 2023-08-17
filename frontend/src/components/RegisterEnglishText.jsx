import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Textarea, VStack, HStack  } from "@chakra-ui/react";
import { registerEnglishText } from '../lib/api/englishText';

const RegisterEnglishText = ({ setEnglishTexts, setSelectedText, setSelectedComponent }) => {
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
      setSelectedComponent('ShowEnglishText');
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
      const res = await registerText(title, text);
      setSelectedText(res);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Textarea 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title here..."
          resize="vertical"
          rows={2}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Text</FormLabel>
        <Textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          resize="vertical"
          rows={30}
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
