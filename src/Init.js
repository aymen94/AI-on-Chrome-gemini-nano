import React, { useState, useEffect, useMemo } from "react";
import Instructions from "./component/Instructions";
import NanoChat from "./component/NanoChat";
import { Box, CssBaseline, } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";



export default () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isGeminiAvailable, setIsGeminiAvailable] = useState(false);

    useEffect(() => {
        const checkSummarizerAvailability = async () => {
            const available = (await self.ai.summarizer.capabilities()).available;
            setIsGeminiAvailable(available);
        };
        checkSummarizerAvailability();
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: 1 }}>
                <div style={{ cursor: "pointer", fontSize: "1.5rem", marginRight: "1rem" }} onClick={() => setDarkMode((prev) => !prev)}>
                    {darkMode ? "🌖" : "🌒"}
                </div>
                <div style={{ textAlign: "center", flexGrow: 1, fontSize: "1.5rem" }}>
                    {isGeminiAvailable ? (
                        <NanoChat />
                    ) : (
                        <Instructions />
                    )}
                </div>
            </Box>
        </ThemeProvider>
    );

};