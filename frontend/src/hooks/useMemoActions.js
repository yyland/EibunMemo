import { useState } from 'react';
import { registerMemo, deleteMemo, updateMemo } from '../lib/api/memo';
import {
  registerMemoWord,
  deleteMemoWord,
  getMemosByMemoWord,
} from '../lib/api/memoWord';

export const useMemoActions = () => {
  const [inputMemo, setInputMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingMemoId, setEditingMemoId] = useState(null);

  const handleMemoSubmit = async ({
    selectedRegisteredWord,
    selectedWord,
    selectedText,
    startIndex,
    endIndex,
    setDisplayedMemos,
    setSelectedRegisteredWord,
    setMemoWords,
  }) => {
    if (isEditing) {
      await saveEditedMemo(selectedRegisteredWord, setDisplayedMemos);
      return;
    }

    if (selectedRegisteredWord) {
      await registerNewMemo(selectedRegisteredWord, setDisplayedMemos);
    } else {
      const newWord = await registerNewWord(
        selectedWord,
        selectedText,
        startIndex,
        endIndex,
        setMemoWords,
        setSelectedRegisteredWord
      );
      if (newWord) {
        await registerNewMemo(newWord, setDisplayedMemos);
      }
    }
  };

  const saveEditedMemo = async (word, setDisplayedMemos) => {
    try {
      await updateMemo({
        id: editingMemoId,
        memo: {
          memo_word_id: word.id,
          body: inputMemo,
        },
      });
      setIsEditing(false);
      setEditingMemoId(null);
      setInputMemo('');
    } catch (err) {
      console.error(err);
    }
    const resMemos = await getMemosByMemoWord(`${word.id}`);
    setDisplayedMemos([...resMemos.data]);
  };

  const registerNewMemo = async (word, setDisplayedMemos) => {
    try {
      const res = await registerMemo({
        memo: {
          memo_word_id: word.id,
          body: inputMemo,
        },
      });
      setInputMemo('');
      setDisplayedMemos((prevMemos) => [...prevMemos, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const registerNewWord = async (
    selectedWord,
    selectedText,
    startIndex,
    endIndex,
    setMemoWords,
    setSelectedRegisteredWord
  ) => {
    try {
      const res = await registerMemoWord({
        memo_word: {
          english_text_id: selectedText.id,
          word: selectedWord,
          start_position: startIndex,
          end_position: endIndex,
        },
      });
      setMemoWords((prevWords) => [...prevWords, res.data]);
      setSelectedRegisteredWord(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteWord = async (
    wordId,
    setSelectedRegisteredWord,
    setSelectedWord,
    setDisplayedMemos,
    setMemoWords
  ) => {
    try {
      await deleteMemoWord(wordId);
      setSelectedRegisteredWord(null);
      setSelectedWord('');
      setDisplayedMemos([]);
      setMemoWords((prevWords) =>
        prevWords.filter((word) => word.id !== wordId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMemo = async (memoId, setDisplayedMemos) => {
    try {
      await deleteMemo(memoId);
      setDisplayedMemos((prevMemos) =>
        prevMemos.filter((memo) => memo.id !== memoId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditStart = (memoId, memoBody) => {
    setIsEditing(true);
    setEditingMemoId(memoId);
    setInputMemo(memoBody);
  };

  return {
    inputMemo,
    setInputMemo,
    isEditing,
    handleMemoSubmit,
    handleDeleteWord,
    handleDeleteMemo,
    handleEditStart,
  };
};
