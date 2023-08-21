import { Text, Box, useTheme } from "@chakra-ui/react";
import { getMemosByMemoWord } from "../lib/api/memoWord";

const ShowEnglishText = ({ 
  selectedText, 
  selectedWord, 
  setSelectedRegisteredWord, 
  setSelectedWord, 
  startIndex, 
  setStartIndex, 
  endIndex, 
  setEndIndex, 
  memoWords, 
  setDisplayedMemos,
  mode,
  selectedRegisteredWord,
 }) => {

  const theme = useTheme();
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
    setSelectedWord(word.word);
    try {
      const res = await getMemosByMemoWord(word.id);
      setDisplayedMemos(res.data);
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
        const word = memoWords.find(w => w.startPosition <= index && w.endPosition >= index);
        const isSavedWord = !!word;

        let defaultStyling = {
          backgroundColor: (selectedWord !== null && startIndex !== null && endIndex !== null && index >= startIndex && index <= endIndex && !isSavedWord)
                          ? theme.colors.blue[100]
                          : '',
          cursor: isSavedWord ? 'pointer' : 'default',
          paddingBottom: "1px",
          borderBottom: isSavedWord ? `2px solid ${theme.colors.gray[400]}` : "none",
        };
  
        // 'word' モードで、選択したワードの背景色を変更
        const isWordMode = mode === 'word';
        const isIndexWithinSelectedWord = selectedRegisteredWord !== null 
          && selectedRegisteredWord.startPosition <= index 
          && selectedRegisteredWord.endPosition >= index;
        
        if (isWordMode && isIndexWithinSelectedWord) {
          defaultStyling.backgroundColor = theme.colors.yellow[100];
        }

        return (
          <Box
            as="span"
            key={index}
            data-index={index}
            onMouseMove={handleMouseMove}
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={() => handleMouseUp(index)}
            onClick={isSavedWord ? () => handleWordClick(word) : null}
            style={defaultStyling}
          >
            {char}
          </Box>
        );
      })}
    </Text>
  );
};

export default ShowEnglishText;