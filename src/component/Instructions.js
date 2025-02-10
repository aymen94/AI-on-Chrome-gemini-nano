import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Instructions = () => {
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState("");

  const handleActivate = async () => {
    if (window.chrome && chrome.ai) {
      try {

        await chrome.ai.initialize();
        setActivated(true);
        setError("");
      } catch (err) {
        console.error("Activation error:", err);
        setError("Activation failed: " + err.message);
      }
    } else {
      setError(
        "Chrome Nano AI API is not available. Please use the latest version of Chrome and ensure the experimental Nano AI features are enabled."
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Activate Chrome Nano AI
        </Typography>
        {activated ? (
          <Typography variant="body1" color="success.main">
            Nano AI has been successfully activated!
          </Typography>
        ) : (
          <Box>
            <Typography variant="body1" gutterBottom>
              To use Nano AI features, click the button below to activate it in
              your browser.
            </Typography>
            <Button variant="contained" onClick={handleActivate}>
              Activate Nano AI
            </Button>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        )}
        <Box sx={{ mt: 4 }} textAlign={"left"}>
          <Typography variant="h6" gutterBottom>
            How to Activate Internal AI in Your Browser
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use APIs on localhost. All of the APIs are available on localhost in Chrome. Follow these steps:
          </Typography>
          <Typography variant="body2" gutterBottom>
            1. Go to <code>chrome://flags/#prompt-api-for-gemini-nano</code>.
          </Typography>
          <Typography variant="body2" gutterBottom>
            2. Select <strong>Enabled</strong>.
          </Typography>
          <Typography variant="body2" gutterBottom>
            3. Click <strong>Relaunch</strong> or restart Chrome.
          </Typography>
          <Typography variant="body2" gutterBottom>
            4. To confirm Gemini Nano has downloaded and works as intended, open DevTools and type <code>(await ai.assistant.capabilities()).available;</code> into the console. This should return <strong>readily</strong>.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Troubleshoot localhost:
          </Typography>
          <Typography variant="body2" gutterBottom>
            1. Restart Chrome.
          </Typography>
          <Typography variant="body2" gutterBottom>
            2. Go to <code>chrome://components</code>.
          </Typography>
          <Typography variant="body2" gutterBottom>
            3. Confirm that <strong>Optimization Guide On Device Model</strong> is present. This means Gemini Nano is either available or downloading.
          </Typography>
          <Typography variant="body2" gutterBottom>
            4. If there's no version number listed, click <strong>Check for update</strong> to force the download.
          </Typography>
          <Typography variant="body2" gutterBottom>
            5. Open DevTools and type <code>(await ai.assistant.capabilities()).available;</code> into the console. This should return <strong>readily</strong>.
          </Typography>
          <Typography variant="body2" gutterBottom>
            6. If necessary, wait for some time and repeat these steps.
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
            For more info, view: <a href="https://developer.chrome.com/docs/ai/get-started" target="_blank" rel="noopener noreferrer">https://developer.chrome.com/docs/ai/get-started</a>
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            GitHub Repo:{" "}
            <a
              href="https://github.com/aymen94/AI-on-Chrome-gemini-nano"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/aymen94/AI-on-Chrome-gemini-nano
            </a>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Instructions;
