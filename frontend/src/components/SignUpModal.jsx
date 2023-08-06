import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { signUp } from "../lib/api/auth.js";

export const SignUpModal = ({isOpen, onClose}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  const clearInput = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規ユーザー登録</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">ユーザー名</Text>
          <Input
            placeholder="ユーザー名"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            mb="16px"
          />
          <Text fontWeight="bold">パスワード</Text>
          <Input
            placeholder="パスワード"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            mb="16px"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              signUp({ username, password });
              clearInput();
              onClose();
            }}
          >
            登録する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};