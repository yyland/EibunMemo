import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
// import { getUser } from "../lib/api/auth.js";
import { useDisclosure } from "@chakra-ui/react";
import { signIn, getUser } from "../lib/api/auth.js";
import Cookies from "js-cookie";

export const SignUpModal = ({isSignUpModalOpen, onSignUpModalClose, onClose, signUp}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();


  const login = async () => {
    try {
      const res = await signIn({ username, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("texts");
    } catch (e) {
      console.log(e);
    }
  };


  const clearEvent = () => {
    setUsername("");
    setPassword("");
  };


  return (
    <Modal isOpen={isSignUpModalOpen} onClose={onSignUpModalClose} isCentered>
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
              clearEvent();
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


