import { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CandidatesTable from "../components/CandidatesTable";
import { fetchCandidatesList, type CandidateResponse } from "../services/candidatesService";

export default function HRDashboard() {
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCandidatesList();
        setCandidates(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "שגיאה בטעינת המועמדים");
      } finally {
        setLoading(false);
      }
    };
    load();
    // Refresh every 30 seconds
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const tableData = candidates.map((item) => ({
    name: item.analysis.dashboard_view.full_name,
    phone: item.analysis.dashboard_view.phone,
    email: item.analysis.dashboard_view.email,
    profile: item.analysis.dashboard_view.status || "מועמד",
    score: Math.round(item.analysis.dashboard_view.match_percent * 10),
  }));

  return (
    <Box dir="rtl" sx={{ background: "#f5f5f5", minHeight: "100vh", p: 4 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, fontWeight: "bold", color: "#c62828" }}
      >
        🏢 דאשבורד HR - כל המועמדים
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress sx={{ color: "#e53935" }} />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <CandidatesTable data={tableData} rawData={candidates} />
      )}
    </Box>
  );
}
