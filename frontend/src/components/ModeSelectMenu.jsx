import React from "react";
import { Button, HStack } from "@chakra-ui/react";

export const ModeSelectMenu = ({ mode, setMode }) => {

  const buttonStyle = {
    bgColor: "blue.800",
    color: "white",
    _hover: { bg: "blue.700" },
    _active: { bg: "blue.900", transform: "scale(0.98)" },
    fontSize: "md",
    fontWeight: "normal",
    lineHeight: "1.2em",
    letterSpacing: "0.05em",
    size: "sm",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
  };

  return (
    <HStack spacing={2}>
      <Button
        {...buttonStyle}
        bg={mode === "text" ? "blue.700" : "blue.800"}
        onClick={() => setMode("text")}
      >
        Text
      </Button>
      <Button
        {...buttonStyle}
        bg={mode === "word" ? "blue.700" : "blue.800"}
        onClick={() => setMode("word")}
      >
        Word
      </Button>
    </HStack>
  );
}
