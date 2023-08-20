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
  Heading,
} from "@chakra-ui/react";
import { signIn } from "../lib/api/auth.js";
import Cookies from "js-cookie";

export const SignInModal = ({isOpen, onClose}) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const register = async () => {
    try {
      const res = await signIn({ 
        username: inputUsername,
        password: inputPassword,
      });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const clearInput = () => {
    setInputUsername("");
    setInputPassword("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h3" size="md" mb="16px">ログイン</Heading>
          <Input
            placeholder="ユーザー名"
            value={inputUsername}
            onChange={(event) => setInputUsername(event.target.value)}
            mb="16px"
          />
          <Input
            placeholder="パスワード"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
            mb="16px"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              register({ inputUsername, inputPassword });
              clearInput();
              onClose();
            }}
          >
            ログイン
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};