import EnglishTextList from "./EnglishTextList";
import { Button } from "@chakra-ui/react";

const Menu = ({selectedText, setSelectedComponent, setSelectedText, englishTexts, deleteText, onSignUpModalOpen }) => {
  return (
    <>
    <Button colorScheme='teal' variant='outline' onClick={onSignUpModalOpen}>
      ユーザー登録
    </Button>
      <Button colorScheme='teal' variant='outline' onClick={() => setSelectedComponent('RegisterEnglishText')}>
        New Text
      </Button>
      <EnglishTextList selectedText={selectedText} setSelectedText={setSelectedText} englishTexts={englishTexts} deleteText={deleteText} />
    </>
  );
};

export default Menu