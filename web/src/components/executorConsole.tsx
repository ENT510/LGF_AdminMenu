import React, { useState, useRef } from "react";
import {
  Card,
  Button,
  Loader,
  Title,
  Flex,
  Textarea,
  Select,
  TextInput,
  Group,
  Text,
} from "@mantine/core";
import { IconClearAll, IconPlayerPlay } from "@tabler/icons-react";
import Editor from "@monaco-editor/react";
import { inputStyles } from "./InputStyles";
import { fetchNui } from "../utils/fetchNui";
import { handleCommand, runCode } from "../utils/executorFn";
import { PinInput } from "@mantine/core"; 
import { motion } from "framer-motion"; 


const ExecutorConsole: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("lua");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>(""); 
  const [errorMessage, setErrorMessage] = useState<string>("");

  const correctPin = "123456";

  const clearEditor = () => {
    setCode("");
  };

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid Pin!");
    }
  };

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    lineNumbers: "on",
    wordWrap: "on",
    fontSize: 14,
    tabSize: 2,
    autoIndent: "full",
    smoothScrolling: true,
    scrollBeyondLastLine: false,
    renderLineHighlight: "line",
    renderWhitespace: "boundary",
    quickSuggestions: true,
    cursorBlinking: "smooth",
    formatOnPaste: true,
    folding: true,
    foldingStrategy: "auto",
    lineHeight: 22,
    mouseWheelZoom: true,
    padding: {
      top: 10,
      bottom: 10,
    },
  };

  if (!isAuthenticated) {
    return (
      <Flex justify="center" align="center" style={{ height: "780px" }}>
        <Card
          style={{
            width: "600px",
            backgroundColor: "rgba(35, 45, 61, 0.9)",
            color: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title order={3} style={{ color: "white" }}>
            Locked Access
          </Title>
          <Text mb={20} color="dimmed" size="sm">
            In order to protect this page from unauthorized access, we require a
            PIN code. This PIN ensures that only trusted users can interact with
            the code runner, preventing potential security risks. Please keep this
            PIN private and do not share it with others. This access is mainly
            for debugging and executing code securely.
          </Text>
          <Group position="center">
            <PinInput
              value={pin}
              onChange={setPin}
              length={6}
              type="number"
              mask
              aria-label="Enter Pin"
              styles={inputStyles}
              radius="xs"
              size="md"
              style={{ marginBottom: "20px" }}
            />
          </Group>
          {errorMessage && (
            <Text mb={5} color="red" size="lg">
              {errorMessage}
            </Text>
          )}

          <Button
            onClick={handlePinSubmit}
            size="xs"
            variant="light"
            fullWidth
            color="teal"
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            Access
          </Button>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex gap="xs" justify="center" direction="column" wrap="wrap">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Flex
          gap="xs"
          justify="flex-end"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Select
            value={language}
            onChange={setLanguage}
            data={[
              { value: "lua", label: "Lua" },
              { value: "javascript", label: "JavaScript" },
              { value: "typescript", label: "TypeScript" },
            ]}
            size="xs"
            styles={inputStyles}
            placeholder="Select Language"
            style={{ width: "150px" }}
            color="teal"
          />
          <Select
            value={theme}
            styles={inputStyles}
            onChange={setTheme}
            data={[
              { value: "vs-dark", label: "Dark" },
              { value: "vs-light", label: "Light" },
            ]}
            size="xs"
            placeholder="Select Theme"
            style={{ width: "150px" }}
            color="teal"
          />
        </Flex>
      </motion.div>


      <Editor
        value={code}
        onChange={(newValue: string | undefined) => setCode(newValue || "")}
        language={language}
        theme={theme}
        height="600px"
        width="100%"
        options={options}
        defaultLanguage="lua"
      />


      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        style={{ width: "100%" }}
      >
        <Card
          padding="xs"
          style={{
            backgroundColor: "rgba(35, 45, 61, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            flex: "1 1 0",
          }}
        >
          <Title mb={10} tt="uppercase" order={4} style={{ color: "white" }}>
            Console Output
          </Title>
          <Textarea
            radius="xs"
            value={output}
            readOnly={true}
            minRows={3}
            styles={inputStyles}
            variant="filled"
            style={{
              fontSize: "14px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          />
        </Card>


        <Flex direction="column" gap="xs" align="flex-end">
          <Button
            onClick={() =>
              runCode(code, language, setLoading, setOutput, fetchNui)
            }
            disabled={loading}
            size="xs"
            variant="light"
            fullWidth
            color="teal"
            leftIcon={<IconPlayerPlay size={16} />}
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            {loading ? <Loader color="white" size="sm" /> : "Run Code"}
          </Button>
          <Button
            onClick={clearEditor}
            size="xs"
            variant="light"
            fullWidth
            color="red"
            leftIcon={<IconClearAll size={16} />}
            style={{
              backgroundColor: "rgba(35, 45, 61, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            Clear Editor
          </Button>
          <TextInput
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter a command"
            radius="xs"
            onKeyDown={(e) => {
              if (e.key === "Enter" && command.trim()) {
                handleCommand(
                  command,
                  history,
                  setCommand,
                  setOutput,
                  setHistory
                );
              }
            }}
            variant="filled"
            size="lg"
            styles={inputStyles}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ExecutorConsole;
