import React from 'react';
import { Box } from "@chakra-ui/react";
import { FormControl, Button } from "@chakra-ui/react";
import TextareaAutosize from 'react-textarea-autosize';

export const MemoForm = ({ memo, isEditing, setMemo }) => {

  return (
    <>
      <FormControl>
        <TextareaAutosize
          minRows={5}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{
            resize: 'vertical', 
            width: '100%', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            border: '2px solid #e2e8f0',
          }}
        />
      </FormControl>

      <Box textAlign="right">
        {isEditing ? (
          <Button 
            type="submit" 
            colorScheme="blue"
            size="sm"
            backgroundColor="blue.500"
            _hover={{ bg: "blue.600" }} 
          >
            Save
          </Button>
        ) : (
          <Button 
            type="submit" 
            colorScheme="blue"
            size="sm"
            backgroundColor="blue.500"
            _hover={{ bg: "blue.600" }} 
          >
            Register
          </Button>
        )}
      </Box>
    </>
  )
}
