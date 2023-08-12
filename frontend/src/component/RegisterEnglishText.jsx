import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { registerEnglishText } from '../lib/api/englishText';

const RegisterEnglishText = ({ setEnglishTexts, englishTexts, setSelectedText ,setSelectedComponent }) => {
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
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Text</FormLabel>
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </FormControl>
      <Button type="submit">Register</Button>
    </VStack>
  );
};

export default RegisterEnglishText;
