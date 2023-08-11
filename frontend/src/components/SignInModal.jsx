import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await signIn({ username, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/texts");
    } catch (e) {
      console.log(e);
    }
  };

  const clearInput = () => {
    setUsername("");
    setPassword("");
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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            mb="16px"
          />
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
              register({ username, password });
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