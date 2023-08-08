import React, { useState, useEffect } from 'react';
import Memo from '../component/Memo';
import Menu from '../component/Menu';
import RegisterEnglishText from '../component/RegisterEnglishText';
import ShowEnglishText from '../component/ShowEnglishText';
import { SignUpModal } from '../components/SignUpModal';
import axios from 'axios';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Link as CLink,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import { getUser } from '../lib/api/auth.js';
import { useNavigate } from 'react-router-dom';
import { signIn, getUser } from '../lib/api/auth.js';
import Cookies from 'js-cookie';
import { deleteEnglishText, getEnglishTexts } from '../lib/api/englishText';
import { registerEnglishText } from '../lib/api/englishText';
import { updateEnglishText } from '../lib/api/englishText';
import { getMemoWords } from '../lib/api/memoWord';
import { registerMemoWord } from '../lib/api/memoWord';
import { updateMemoWord } from '../lib/api/memoWord';
import { getMemo } from '../lib/api/memo';
import { registerMemo } from '../lib/api/memo';
import { updateMemo } from '../lib/api/memo';


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
    <Flex>
      <Box width="300px" border="1px" borderColor="gray.200" p="4">
        <Menu
          setEnglishTexts={setEnglishTexts}
          selectedText={selectedText}
          setSelectedComponent={setSelectedComponent}
          setSelectedText={setSelectedText}
          englishTexts={englishTexts}
        />
      </Box>
      <Box flex="2" border="1px" borderColor="gray.200" p="4" overflow="auto">
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

export default Texts;
