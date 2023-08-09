import React, { useState, useEffect } from 'react';
import Memo from '../component/Memo';
import Menu from '../component/Menu';
import RegisterEnglishText from '../component/RegisterEnglishText';
import ShowEnglishText from '../component/ShowEnglishText';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../lib/api/auth.js';

const Texts = () => {
  const [memoWords, setMemoWords] = useState([]);
  const [displayedMemos, setDisplayedMemos] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('ShowEnglishText');
  const [englishTexts, setEnglishTexts] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedRegisteredWord, setSelectedRegisteredWord] = useState(null);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (!res || !res.data.isLogin) {
          navigate('/');
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  const addMemoWord = (newMemoWord) => {
    setMemoWords([...memoWords, newMemoWord]);
  };

  return (
    <Flex minHeight="100vh" direction="row">
      <Box width="240px" border="0px" borderColor="gray.00" bg={'blue.800'}>
        <Menu
          setEnglishTexts={setEnglishTexts}
          selectedText={selectedText}
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          englishTexts={englishTexts}
        />
      </Box>
      <Box flex="2" border="1px" borderColor="gray.200" p="4" overflow="auto" bg={'#fefeff'}>
        {selectedComponent === 'ShowEnglishText' ? (
          <ShowEnglishText
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            setEnglishTexts={setEnglishTexts}
            selectedWord={selectedWord}
            setMemoWords={setMemoWords}
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
            setEnglishTexts={setEnglishTexts}
            englishTexts={englishTexts}
            setSelectedText={setSelectedText}
            setSelectedComponent={setSelectedComponent}
          />
        )}
      </Box>
      <Box flex="1" border="0px" borderColor="gray.200" p="0" overflow="auto" bg={'#fdfdff'}>
        <Memo
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
          setSelectedRegisteredWord={setSelectedRegisteredWord}
          selectedRegisteredWord={selectedRegisteredWord}
          setDisplayedMemos={setDisplayedMemos}
          displayedMemos={displayedMemos}
          setMemoWords={setMemoWords}
          memoWords={memoWords}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedText={selectedText}
          addMemoWord={addMemoWord}
        />
      </Box>
    </Flex>
  );
};

export default Texts;
