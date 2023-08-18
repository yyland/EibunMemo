import { Text, Box, useTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { getEnglishTexts } from "../lib/api/englishText";
import { getMemosByMemoWord } from "../lib/api/memoWord";

const ShowEnglishText = ({ 
  selectedText, 
  setSelectedText, 
  setEnglishTexts, 
  selectedWord, 
  setSelectedRegisteredWord, 
  setSelectedWord, 
  startIndex, 
  setStartIndex, 
  endIndex, 
  setEndIndex, 
  memoWords, 
  setDisplayedMemos
 }) => {
  
  const theme = useTheme();

  const fetch = async () => {
    try {
      const resTexts = await getEnglishTexts();
      if (!resTexts || !resTexts.data) {
        return;
      }
      const englishTexts = resTexts.data;
      setEnglishTexts(englishTexts);

      if (englishTexts.length > 0 && !selectedText) {
        setSelectedText(englishTexts[0]);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chars = selectedText && selectedText.body ? selectedText.body.split('') : [];

  const getSelectedWord = () => {
    const selected = window.getSelection().toString().trim();
    if (selected.length > 0) {
      setSelectedWord(selected);
    }
  };

  const handleMouseMove = () => {
    getSelectedWord();
  };

  const handleMouseDown = (index) => {
    setStartIndex(index);
    setEndIndex(null);
  };

  const handleMouseUp = (index) => {
    // TODO : mouseUp時に行と行の中央にいるとイベントが発生しないことへの対応
    setTimeout(() => {
      const selected = window.getSelection().toString().trim();
      if (selected.length === 0) return;

      setDisplayedMemos([]);
      setSelectedWord(selected);
      setSelectedRegisteredWord(null);

      let start = null;
      let end = null;

      if (startIndex === index) {
        start = startIndex;
        end = start;
        setEndIndex(end);
      } else if (startIndex < index) {
        if (!isMatchedWithStartChar(startIndex)) {
          start = startIndex + 1;
          setStartIndex(start);
        } else {
          start = startIndex;
        }
        end = start + (selected.length - 1);
        setEndIndex(end);
      } else {
          start = startIndex - (selected.length - 1);
        if (!isMatchedWithStartChar(start)) {
          start = start - 1;
          setStartIndex(start);
        } else {
          setStartIndex(start);
        }
        end = start + (selected.length - 1);
        setEndIndex(end);
      }

      if (!isMatchedWithSelectedWord(start, end, selected)) {
        fixIndex(start, end, selected);
      }

    }, 0); // 0ミリ秒後に実行（次のイベントループで実行）

  };

  const isMatchedWithSelectedWord = (start, end, selected) => {
    const spans = document.querySelectorAll('span');
    const wordFromIndex = [...spans].filter(span => {
      const index = Number(span.dataset.index);
      return index >= start && index <= end;
    }).map(span => span.innerText).join('');
    return wordFromIndex === selected;
  };

  const fixIndex = (start, end, selected) => {
    let newStart = [];
    let newEnd = [];
    const spans = document.querySelectorAll('span');
    const selectedArr = selected.split('');
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      const spanIndex = Number(span.dataset.index);
      if (span.innerText === selectedArr[0]) {
        if (isMatchedWithSelectedWord(spanIndex, spanIndex + (selectedArr.length - 1), selected)) {
          newStart.push(spanIndex);
          newEnd.push(spanIndex + (selectedArr.length - 1));
        }
      }
    }
    if (newStart.length === 0) return;
    if (newStart.length === 1) {
      setStartIndex(newStart[0]);
      setEndIndex(newEnd[0]);
      return;
    }
    if(newStart.length > 1) {
      let minDiff = Infinity;
      let minIndex = null;
      for (let i = 0; i < newStart.length; i++) {
        const diff = Math.abs(newStart[i] - start);
        if (diff < minDiff) {
          minDiff = diff;
          minIndex = i;
        }
      }
      setStartIndex(newStart[minIndex]);
      setEndIndex(newEnd[minIndex]);
    }
  }
  
  const isMatchedWithStartChar = (index) => {
    const span = document.querySelector(`span[data-index="${index}"]`);
    if (span) {
      const word = span.innerText;
      return word === selectedWord[0];
    }
    return false;
  };

  const handleWordClick = async (word) => {

    setDisplayedMemos([]);
    setSelectedWord(word.word);

    try {
      const res = await getMemosByMemoWord(word.id);
      setDisplayedMemos(prev => [...prev, ...res.data]);
    } catch (err) {
      console.log(err);
    }
    setSelectedRegisteredWord(word);
  };
  return (
    <Text
      p={3}
      fontSize='lg'
      width="100%"
      whiteSpace="pre-wrap"
      textAlign="justify"
    >
      {chars.map((char, index) => {
        const word = memoWords.find(w => w.startPosition <= index && w.endPosition >= index && w.englishTextId === selectedText.id);
        const isSavedWord = !!word;
        return (
          <Box
            as="span"
            key={index}
            data-index={index}
            onMouseMove={handleMouseMove}
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={() => handleMouseUp(index)}
            onClick={isSavedWord ? () => handleWordClick(word) : null}
            style={{
              backgroundColor: (startIndex !== null && endIndex !== null && index >= startIndex && index <= endIndex && !isSavedWord) 
                                ? theme.colors.blue[100] 
                                : '',
              cursor: isSavedWord ? 'pointer' : 'default',
              paddingBottom: "1px",
              borderBottom: isSavedWord ? `2px solid ${theme.colors.gray[400]}` : "none",
            }}
          >
            {char}
          </Box>
        );
      })}
    </Text>
  );
};

export default ShowEnglishText;