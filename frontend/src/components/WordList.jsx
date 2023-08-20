import { Box, List, ListItem, Icon } from "@chakra-ui/react";
import { getMemoWordsByEnglishText, getEnglishText } from "../lib/api/englishText";
import { getMemoWords } from "../lib/api/memoWord";
import { useEffect, useState } from "react";
import { getMemosByMemoWord } from "../lib/api/memoWord";

const WordList = ({
  setSelectedText, 
  setSelectedComponent,
  selectedRegisteredWord,
  setSelectedRegisteredWord,
  setMemoWords,
  setDisplayedMemos,
  setSelectedWord,
}) => {

  const [allMemoWords, setAllMemoWords] = useState([]);

  useEffect(() => {
    const fetchMemoWords = async () => {
      try {
        const res = await getMemoWords();
        const words = res.data;
        setAllMemoWords(words);
        setSelectedRegisteredWord(words[0]);
        const resMemos = await getMemosByMemoWord(words[0].id);
        setDisplayedMemos(resMemos.data);
        setSelectedWord(null);
        const resText = await getEnglishText(words[0].englishTextId);
        setSelectedText(resText.data);
        const resWords = await getMemoWordsByEnglishText(words[0].englishTextId);
        setMemoWords(resWords.data);
        setSelectedComponent('ShowEnglishText');
      } catch (err) {
        console.error(err);
      }
    };
    fetchMemoWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const onListItemClick = async (word) => {
    try {
      const resWords = await getMemoWordsByEnglishText(word.englishTextId);
      const resText = await getEnglishText(word.englishTextId);
      const resMemos = await getMemosByMemoWord(word.id);
      const words = resWords.data;
      const text = resText.data;
      const memos = resMemos.data;
      setMemoWords(words);
      setSelectedText(text);
      setSelectedRegisteredWord(word);
      setDisplayedMemos(memos);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between"
      height="calc(100vh - 135px)"
    >
      <List 
        width="100%" 
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#718096',
            borderRadius: '5px',
          },
          /* Firefox */
          scrollbarWidth: 'thin',
          scrollbarColor: '#718096 transparent',
        }}
      >
        {allMemoWords.map((word) => (
          <ListItem
            key={word.id} 
            color="white"
            width="100%"
            onClick={() => onListItemClick(word)}
            bg={selectedRegisteredWord && selectedRegisteredWord.id === word.id ? 'blue.700' : 'blue.800'}
            _hover={{ bg: 'blue.700' }}
            my={0}
            py={2}
            px={4}
            cursor="pointer"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            role="group"  // ListItemがhoverされたときに表示
            position="relative"
          >
            <Icon viewBox='0 0 200 200' boxSize='9px' color='gray.400' mr={4} ml={1}>
              <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
              />
            </Icon>
            <Box
              flex="1"
              minW="0"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {word.word}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WordList;
