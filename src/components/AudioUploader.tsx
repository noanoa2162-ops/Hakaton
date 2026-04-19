import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import CheckingData from "./CheckingData";
import SuccessMessage from "./SuccessMessage";
import { uploadAudioFile } from "../services/audioAnalysisService";

export default function AudioUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // בחירת קובץ
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // שליחה
  const handleUpload = async () => {
    if (!file) return;

    setStep("loading");
    setErrorMessage("");

    try {
      await uploadAudioFile(file);
      setStep("success");
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "שגיאה בשליחת הקובץ"
      );
      setStep("form");
    }
  };

  if (step === "loading") return <CheckingData />;
  if (step === "success") return <SuccessMessage />;

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper
        sx={{
          width: "90%",
          maxWidth: 500,
          p: 4,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          border: "1px solid #e53935",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#e53935" }}
        >
          העלאת קובץ שמע
        </Typography>

        {/* הודעת שגיאה */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* כפתור בחירת קובץ */}
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{
            borderColor: "#e53935",
            color: "#e53935",
            mb: 2,
          }}
        >
          בחר קובץ
          <input type="file" hidden accept="audio/*" onChange={handleFileChange} />
        </Button>

        {/* הצגת שם הקובץ */}
        {file && (
          <Typography sx={{ mb: 2 }}>{file.name}</Typography>
        )}

        {/* כפתור שליחה */}
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleUpload}
          disabled={!file}
          sx={{
            mt: 2,
            background: "#e53935",
            "&:hover": { background: "#c62828" },
          }}
        >
          שלח קובץ
        </Button>
      </Paper>
    </Box>
  );
}