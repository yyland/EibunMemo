import React, { useState, useEffect } from 'react';
import Memo from '../components/Memo';
import Menu from '../components/Menu';
import RegisterEnglishText from '../components/RegisterEnglishText';
import ShowEnglishText from '../components/ShowEnglishText';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../lib/api/auth.js';
import { getEnglishTexts } from '../lib/api/englishText.js';
import { getMemoWordsByEnglishText } from '../lib/api/englishText';

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
    const fetchUser = async () => {
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

    const fetchEnglishTexts = async () => {
      try {
        const resTexts = await getEnglishTexts();
        if (!resTexts || !resTexts.data) {
          return null;
        }
        const texts = resTexts.data;
        setEnglishTexts(texts);
        if (texts.length > 0 && !selectedText) {
          setSelectedText(texts[0]);
          return texts[0];
        }
        return null;
      } catch (err) {
        console.error(err);
        return null;
      }
    };

    const fetchMemoWords = async (text) => {
      try {
        if (!text) return;
        const resWords = await getMemoWordsByEnglishText(text.id);
        if (!resWords || !resWords.data) {
          return;
        }
        const words = resWords.data;
        setMemoWords(words);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      await fetchUser();
      const firstText = await fetchEnglishTexts();
      await fetchMemoWords(firstText);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setMemoWords={setMemoWords}
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
        {isLoggedIn ? (
          selectedComponent === 'ShowEnglishText' ? (
            <ShowEnglishText
              selectedText={selectedText}
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
              setSelectedText={setSelectedText}
              setSelectedComponent={setSelectedComponent}
            />
          )
        ) : <Box></Box>}
      </Box>
      <Box
        flex="1"
        borderColor="gray.200"
        position="sticky"
        height="100vh"
        overflowY="auto"
        top={0}
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
          startIndex={startIndex}
          endIndex={endIndex}
          selectedText={selectedText}
          isLoggedIn={isLoggedIn}
        />
      </Box>
    </Flex>
  );
};

export default Texts;
