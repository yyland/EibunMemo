import React, { useState } from 'react';
import { Box, VStack } from "@chakra-ui/react";
import { registerMemo } from '../lib/api/memo';
import { registerMemoWord } from '../lib/api/memoWord';
import { getMemosByMemoWord } from '../lib/api/memoWord';
import { deleteMemo } from '../lib/api/memo';
import { deleteMemoWord } from '../lib/api/memoWord';
import { updateMemo } from '../lib/api/memo';
import { MemoForm } from './MemoForm';
import { MemoHeader } from './MemoHeader';
import { MemoList } from './MemoList';

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

  if (!isLoggedIn) return null;
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
          <MemoHeader
            selectedWord={selectedWord}
            selectedRegisteredWord={selectedRegisteredWord}
            handleDeleteSelectedWord={handleDeleteSelectedWord}
          ></MemoHeader>
        </Box>

        {displayedMemos.length > 0 ? (
          <Box py={4}>
            <MemoList
              displayedMemos={displayedMemos}
              handleDeleteMemo={handleDeleteMemo}
              handleEditStart={handleEditStart}
              selectedRegisteredWord={selectedRegisteredWord}
            ></MemoList>
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
            memo={memo}
            setMemo={setMemo}
            isEditing={isEditing}
          ></MemoForm>
        </Box>
      </VStack>
  );
};

export default Memo;
