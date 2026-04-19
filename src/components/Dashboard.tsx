import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import CandidatesTable from "./CandidatesTable";
import type { ApiData } from "../pages/CandidatePage";

type Candidate = {
  name: string;
  phone: string;
  email: string;
  profile: string;
  score: number;
};

type Props = {
  data: ApiData;
};

export type Status = {
  text: string;
  color: "success" | "warning";
  reason: string;
};

export const getStatus = (score: number): Status => {
  if (score >= 70) {
    return { text: "גבוה", color: "success", reason: "התאמה גבוהה" };
  }

  return { text: "בינוני", color: "warning", reason: "התאמה בינונית" };
};

export default function Dashboard({ data }: Props) {
  const [search, setSearch] = useState("");

const candidates: Candidate[] = [
  {
    name: data.dashboard_view.full_name,
    phone: data.dashboard_view.phone,
    email: data.dashboard_view.email,
    profile: data.dashboard_view.status || "מועמד",
    score: Math.round(data.dashboard_view.match_percent * 10),
  },
];

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();

    return candidates.filter((item) => {
      const status = getStatus(item.score);

      return (
        status.text.toLowerCase().includes(q) ||
        status.reason.toLowerCase().includes(q) ||
        item.score.toString().includes(q)
      );
    });
  }, [candidates, search]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => b.score - a.score);
  }, [filteredData]);

  return (
    <Box
      dir="rtl"
      sx={{
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1400px", px: 2 }}>
        
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 10,
            mt: -4,
            fontWeight: "bold",
            color: "#c62828",
          }}
        >
          פיענוח נתוני מועמדים
        </Typography>

        <SearchBar search={search} setSearch={setSearch} />

        <CandidatesTable data={sortedData} rawData={data} />

      </Box>
    </Box>
  );
}