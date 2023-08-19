import React, { useState, useEffect } from 'react';
import Memo from './components/Memo';
import Menu from './components/Menu';
import RegisterEnglishText from './components/RegisterEnglishText';
import ShowEnglishText from './components/ShowEnglishText';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './lib/api/auth.js';
import { createGuestUser } from './lib/api/auth.js';
import Cookies from 'js-cookie';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUser();
        console.log('here1');
        if (!userResponse || !userResponse.data.isLogin) {
          setIsLoggedIn(false);
          setIsGuest(false);
          return false;
        }
        if (userResponse.data.isGuest) {
          setIsLoggedIn(true);
          setIsGuest(true);
          return true;
        } else {
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
        const guestResponse = await createGuestUser();
        if (guestResponse && guestResponse.data.status === 'created') {
          Cookies.set('guest_uuid', guestResponse.data.user.guestUuid);
          Cookies.set('_access_token', guestResponse.headers['access-token']);
          Cookies.set('_client', guestResponse.headers['client']);
          Cookies.set('_uid', guestResponse.headers['uid']);
          setIsLoggedIn(true);
          setIsGuest(true);
          navigate('/texts');
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser().then((isLoggedIn) => {
      if (!isLoggedIn) {
        guestLogin();
      } else {
        navigate('/texts');
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex minHeight="100vh" direction="row">
      <Box width="330px" borderColor="gray.00" bg={'blue.800'}>
        <Menu
          setEnglishTexts={setEnglishTexts}
          selectedText={selectedText}
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          englishTexts={englishTexts}
          isLoggedIn={isLoggedIn}
          setSelectedRegisteredWord={setSelectedRegisteredWord}
        />
      </Box>
      <Box
        flex="2"
        border="1px"
        borderColor="gray.200"
        px="4"
        py={2}
        overflow="auto"
        bg={'#fefeff'}
      >
        {isLoggedIn ? (
          selectedComponent === 'ShowEnglishText' ? (
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
          )
        ) : (
          <Box></Box>
        )}
      </Box>
      <Box
        flex="1"
        border="0px"
        borderColor="gray.200"
        overflow="auto"
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
        />
      </Box>
    </Flex>
  );
};

export default App;
