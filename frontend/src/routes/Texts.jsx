import React, { useState, useEffect } from 'react';
import Memo from '../components/Memo';
import Menu from '../components/Menu';
import RegisterEnglishText from '../components/RegisterEnglishText';
import ShowEnglishText from '../components/ShowEnglishText';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import { getUser } from '../lib/api/auth.js';
import { getEnglishTexts } from '../lib/api/englishText.js';
import { getMemoWordsByEnglishText } from '../lib/api/englishText';
import { getMemoWords } from '../lib/api/memoWord';
import { createGuestUser } from '../lib/api/auth';
import Cookies from 'js-cookie';

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
  const [mode, setMode] = useState('text');
  const [isGuest, setIsGuest] = useState(false);
  const [allMemoWords, setAllMemoWords] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await getUser();
        if (!userRes || !userRes.data.isLogin) {
          setIsLoggedIn(false);
          setIsGuest(false);
          return false;
        }
        if (userRes.data.isGuest) {
          setUserName(userRes.data.data.username);
          setIsLoggedIn(true);
          setIsGuest(true);
          return true;
        } else {
          setUserName(userRes.data.data.username);
          setIsLoggedIn(true);
          setIsGuest(false);
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    const guestLogin = async () => {
      try {
        const guestRes = await createGuestUser();
        if (guestRes && guestRes.data.status === 'created') {
          Cookies.set('guest_uuid', guestRes.data.user.guestUuid);
          Cookies.set('_access_token', guestRes.headers['access-token']);
          Cookies.set('_client', guestRes.headers['client']);
          Cookies.set('_uid', guestRes.headers['uid']);
          setUserName(guestRes.data.user.username);
          setIsLoggedIn(true);
          setIsGuest(true);
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

    const fetchMemoWordsByText = async (text) => {
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

    const fetchAllMemoWords = async () => {
      try {
        const resAllWords = await getMemoWords();
        if (!resAllWords || !resAllWords.data) {
          return;
        }
        const allWords = resAllWords.data;
        setAllMemoWords(allWords);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      const isSignIn = await fetchUser();
      if (!isSignIn) {
        await guestLogin();
      }
      const firstText = await fetchEnglishTexts();
      await fetchMemoWordsByText(firstText);
      await fetchAllMemoWords();
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
          memoWords={memoWords}
          setMemoWords={setMemoWords}
          selectedRegisteredWord={selectedRegisteredWord}
          setSelectedRegisteredWord={setSelectedRegisteredWord}
          mode={mode}
          setMode={setMode}
          isGuest={isGuest}
          setDisplayedMemos={setDisplayedMemos}
          setSelectedWord={setSelectedWord}
          allMemoWords={allMemoWords}
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
              setSelectedWord={setSelectedWord}
              setSelectedRegisteredWord={setSelectedRegisteredWord}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              endIndex={endIndex}
              setEndIndex={setEndIndex}
              memoWords={memoWords}
              setDisplayedMemos={setDisplayedMemos}
              mode={mode}
              selectedRegisteredWord={selectedRegisteredWord}
            />
          ) : (
            <RegisterEnglishText
              setMemoWords={setMemoWords}
              setEnglishTexts={setEnglishTexts}
              setSelectedText={setSelectedText}
              setSelectedComponent={setSelectedComponent}
              setSelectedWord={setSelectedWord}
              setSelectedRegisteredWord={setSelectedRegisteredWord}
              setDisplayedMemos={setDisplayedMemos}
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
          setAllMemoWords={setAllMemoWords}
        />
      </Box>
    </Flex>
  );
};

export default Texts;
