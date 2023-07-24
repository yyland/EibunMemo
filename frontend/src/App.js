import React, { useState, useEffect } from 'react';
import Memo from './component/Memo';
import Menu from './component/Menu';
import RegisterEnglishText from './component/RegisterEnglishText';
import ShowEnglishText from './component/ShowEnglishText';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';

const App = () => {
  const [memoWords, setMemoWords] = useState([]);
  const [displayedMemos, setDisplayedMemos] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('ShowEnglishText');
  const [englishTexts, setEnglishTexts] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedRegisteredWord, setSelectedRegisteredWord] = useState(null);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  const fetch = async () => {
    try {
      const res = await axios.get(
        'https://api.eibunmemo.com/api/english_texts'
      );
      const englishTexts = res.data;
      setEnglishTexts(englishTexts);

      if (englishTexts.length > 0) {
        setSelectedText(englishTexts[0]);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      const res = await axios.get('https://api.eibunmemo.com/api/memo_words');
      const savedWords = res.data;
      setMemoWords(savedWords);
    } catch (err) {
      console.error(err);
    }
  };

  const registerText = async (title, text) => {
    try {
      const res = await axios.post(
        'https://api.eibunmemo.com/api/english_texts',
        {
          english_text: {
            title: title,
            text: text,
          },
        }
      );
      const newText = res.data;
      setEnglishTexts((prevTexts) => [...prevTexts, newText]);
      setSelectedComponent('ShowEnglishText');
      setSelectedText(newText);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const deleteText = async (id) => {
    try {
      await axios.delete(`https://api.eibunmemo.com/api/english_texts/${id}`);
      setSelectedText(null);
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  const addMemoWord = (newMemoWord) => {
    setMemoWords([...memoWords, newMemoWord]);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Flex>
      <Box width="300px" border="1px" borderColor="gray.200" p="4">
        <Menu
          selectedText={selectedText}
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          englishTexts={englishTexts}
          deleteText={deleteText}
        />
      </Box>
      <Box flex="2" border="1px" borderColor="gray.200" p="4" overflow="auto">
        {selectedComponent === 'ShowEnglishText' ? (
          <ShowEnglishText
            selectedText={selectedText}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
            setSelectedRegisteredWord={setSelectedRegisteredWord}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            endIndex={endIndex}
            setEndIndex={setEndIndex}
            memoWords={memoWords}
            setDisplayedMemos={setDisplayedMemos}
          />
        ) : (
          <RegisterEnglishText
            registerText={registerText}
            setSelectedText={setSelectedText}
          />
        )}
      </Box>
      <Box flex="1" border="1px" borderColor="gray.200" p="4" overflow="auto">
        <Memo
          selectedWord={selectedWord}
          selectedRegisteredWord={selectedRegisteredWord}
          setDisplayedMemos={setDisplayedMemos}
          displayedMemos={displayedMemos}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedText={selectedText}
          addMemoWord={addMemoWord}
        />
      </Box>
    </Flex>
  );
};

export default App;
