import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  Box,
  TextField,
  Typography,
  MenuItem,
  Paper,
  CssBaseline,
} from "@mui/material";

export default () => {


  // Chat states
  const [selectedFunction, setSelectedFunction] = useState("languageModel");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  // Shared context states
  const [sharedContext, setSharedContext] = useState("generic");
  const [newSharedContext, setNewSharedContext] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    let options = {
      sharedContext,
      type: "key-points",
      format: "markdown",
      length: "medium",
    };

    setMessages((prev) => [...prev, { role: "user", text: userInput }]);

    try {
      setMessages((prev) => [...prev, { role: "assistant", text: "..." }]);

      let response, languageModel, summarizer;

      switch (selectedFunction) {
        case "languageModel":
          if (!languageModel) {
            languageModel = await self.ai.languageModel.create({ systemPrompt: sharedContext });
          }
          response = await languageModel.prompt(userInput);
          break;
        case "summarizer":
          if (!summarizer) {
            summarizer = await self.ai.summarizer.create(options);
          }
          response = await summarizer.summarize(userInput, {
            context: sharedContext,
          });
          break;
        default:
          response = "Unknown function selected";
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: response || "No response" },
      ]);
    } catch (error) {
      console.error("Error during processing:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: "Sorry, something went wrong." },
      ]);
    }
    setUserInput("");
  };


  const handleUpdateSharedContext = () => {
    if (newSharedContext.trim()) {
      setSharedContext(newSharedContext);
      // Optionally, call an update method on your self.ai object
      if (self.ai && typeof self.ai.updateSharedContext === "function") {
        self.ai.updateSharedContext(newSharedContext);
      }
      setNewSharedContext("");
    }
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <CssBaseline />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Card elevation={3} sx={{ borderRadius: 2, flex: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Gemini Nano Chat - AI on Chrome
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                height: 300,
                overflowY: "auto",
                p: 2,
                mt: 2,
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor:
                        msg.role === "user"

                          ? "#90caf9"
                          : "#1976d2"
                            ? "#616161"
                            : "#e0e0e0",
                      color:
                        msg.role === "user"
                          ? "#000"
                          : "#fff"
                            ? "#fff"
                            : "#000",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                      fontSize: "0.8rem"
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              ))}
              <div ref={chatEndRef} />
            </Paper>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
              <TextField
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                margin="normal"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                multiline
                minRows={3}
                maxRows={6}
                sx={{ overflowY: "auto" }}
              />
              <Button
                variant="contained"
                sx={{ mt: 1, alignSelf: "flex-end" }}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "inline", flexDirection: "column", gap: 2 }}>
          <Card elevation={3} sx={{ borderRadius: 2, flex: 1, marginBottom: 1 }}>
            <CardContent>
              <TextField
                select
                label="Select Function"
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
                margin="normal"
                fullWidth
              >
                <MenuItem value="languageModel">Language Model</MenuItem>
                <MenuItem value="summarizer">Summarizer</MenuItem>
              </TextField>
            </CardContent>
          </Card>

          <Card elevation={3} sx={{ borderRadius: 2, flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shared Context
              </Typography>
              <TextField
                label="Update Shared Context"
                multiline
                minRows={6}
                value={newSharedContext}
                onChange={(e) => setNewSharedContext(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleUpdateSharedContext}
              >
                Update Context
              </Button>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Current context: {sharedContext}
              </Typography>
            </CardContent>
          </Card>

        </Box>
      </Box>
    </Box>
  );
};


