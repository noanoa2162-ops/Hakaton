import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import CheckingData from "./CheckingData";
import { sendAnalysisData } from "../services/analysisService";
import type { ApiData } from "../pages/CandidatePage";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
};

type Props = {
  onAnalysisComplete?: (data: ApiData) => void;
};

export default function FirstMassage({ onAnalysisComplete }: Props) {
    const [step, setStep] = useState<"form" | "loading">("form");
  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!form.first_name) newErrors.first_name = "יש להזין שם פרטי";
    if (!form.last_name) newErrors.last_name = "יש להזין שם משפחה";
    if (!form.email || !form.email.includes("@"))
      newErrors.email = "מייל לא תקין";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setStep("loading");
    setErrorMessage("");

    try {
      console.log("Sending data to server...");
      const result = await sendAnalysisData({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
      });

      console.log("Server response:", result);
      
      // Pass the analysis result to parent (Dashboard)
      if (result.success && result.analysis && onAnalysisComplete) {
        onAnalysisComplete(result.analysis);
      } else {
        setErrorMessage("התקבלה תשובה לא תקינה מהשרת");
        setStep("form");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "שגיאה בשליחת הנתונים"
      );
      setStep("form");
    }
  };
if (step === "loading") return <CheckingData />;
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
        elevation={3}
        sx={{
          width: 400,
          p: 4,
          borderRadius: 4,
          border: "1px solid #e53935",
        }}
      >
        {/* כותרת */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 3,
            color: "#c62828",
            fontWeight: "bold",
          }}
        >
          הרשמה למערכת
        </Typography>

        {/* הודעת שגיאה */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* שם פרטי */}
        <TextField
          fullWidth
          label="שם פרטי"
          variant="outlined"
          value={form.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
          error={!!errors.first_name}
          helperText={errors.first_name}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
          }}
        />

        {/* שם משפחה */}
        <TextField
          fullWidth
          label="שם משפחה"
          variant="outlined"
          value={form.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          error={!!errors.last_name}
          helperText={errors.last_name}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
          }}
        />

        {/* מייל */}
        <TextField
          fullWidth
          label="מייל"
          variant="outlined"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
          }}
        />

        {/* טלפון (אופציונלי) */}
        <TextField
          fullWidth
          label="טלפון (אופציונלי)"
          variant="outlined"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e53935",
            },
          }}
        />

        {/* כפתור */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#e53935",
            borderRadius: 3,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#c62828",
            },
          }}
        >
          שליחה
        </Button>
      </Paper>
    </Box>
  );
}