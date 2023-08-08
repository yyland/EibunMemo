import EnglishTextList from "./EnglishTextList";
import { Button } from "@chakra-ui/react";


const Menu = ({setEnglishTexts, selectedText, setSelectedComponent, setSelectedText, englishTexts, deleteText }) => {
  return (
    <>
      <Button colorScheme='teal' variant='outline' onClick={() => setSelectedComponent('RegisterEnglishText')}>
        New Text
      </Button>
      <EnglishTextList setEnglishTexts={setEnglishTexts} selectedText={selectedText} setSelectedText={setSelectedText} englishTexts={englishTexts} />
    </>
  );
};

export default Menu