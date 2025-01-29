interface RunCodeResponse {
  success: boolean;
  message: string;
  result?: any;
}

export const executeJavaScriptOrTS = (
  code: string,
  setOutput: React.Dispatch<React.SetStateAction<string>>
): RunCodeResponse => {
  let outputLog = "";
  const captureLogs = (...args: any[]) => {
    outputLog +=
      args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
        )
        .join(" ") + "\n";
    setOutput(outputLog);
  };

  const originalConsoleLog = console.log;
  try {
    console.log = captureLogs;
    const script = new Function(code); 
    script(); 
    console.log = originalConsoleLog; 
    return {
      success: true,
      message: outputLog || "Code executed successfully",
    };
  } catch (error: any) {
    console.log = originalConsoleLog;
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const runCode = async (
  code: string,
  language: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setOutput: React.Dispatch<React.SetStateAction<string>>,
  fetchNui: (event: string, data: object) => Promise<RunCodeResponse>
): Promise<void> => {
  setLoading(true);
  setOutput("");

  try {
    let result: RunCodeResponse;

    if (language === "lua") {
      result = await fetchNui("LGF_DebugTool.NUI.runCode", {
        codeToRun: code,
      });
    } else if (language === "javascript" || language === "typescript") {
      result = executeJavaScriptOrTS(code, setOutput);
    } else {
      throw new Error("Unsupported language");
    }

    if (result.success) {
      setOutput(result.message || "Code executed successfully");
    } else {
      setOutput(`Error: ${result.message}`);
    }
  } catch (error: any) {
    setOutput(`Execution failed: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

export const handleCommand = (
  command: string,
  history: string[],
  setCommand: React.Dispatch<React.SetStateAction<string>>,
  setOutput: React.Dispatch<React.SetStateAction<string>>,
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const lowerCommand = command.trim().toLowerCase();
  setCommand("");

  switch (lowerCommand) {
    case "clear":
      setOutput("");
      break;
    case "help":
      setOutput(
        "Available commands:\n- clear: Clears the console output\n- history: Shows command history"
      );
      break;
    case "history":
      setOutput(history.map((cmd) => `["${cmd}"]`).join(" , "));
      break;
    default:
      setOutput(`Command not found: ${command}`);
      break;
  }

  setHistory((prevHistory) => [...prevHistory, command]);
};
