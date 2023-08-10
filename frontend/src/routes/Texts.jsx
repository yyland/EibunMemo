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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
        if (res && res.data.isLogin) {
          setUserName(res.data.data.username);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
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
      <Box
        width="330px" 
        borderColor="gray.00" 
        bg={'blue.800'}
        height={'100vh'}
        position="sticky"
        top="0"
      >
        <Menu
          setEnglishTexts={setEnglishTexts}
          selectedText={selectedText}
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          englishTexts={englishTexts}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userName={userName}
        />
      </Box>
      <Box
        flex="2"
        border="1px"
        borderColor="gray.200"
        px="4"
        py={2}
        height={'100vh'}
        position="sticky"
        overflow="auto"
        bg={'#fefeff'}
      >
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
      <Box
        flex="1"
        borderColor="gray.200"
        position="sticky"
        height="100vh"
        overflowY="auto"
        bg={'#fdfdff'}
      >
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
