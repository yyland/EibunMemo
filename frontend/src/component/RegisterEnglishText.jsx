import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

const RegisterEnglishText = ({ registerText, setSelectedText }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
