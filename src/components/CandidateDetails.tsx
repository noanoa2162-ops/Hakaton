import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useLocation } from "react-router-dom";

export default function CandidateDetails() {
const location = useLocation();
  const rawData = location.state;
let list: string[] = [];
  if (!rawData) return <div>אין נתונים</div>;

  // Support both direct data and wrapped {analysis: ...} format
  const data = rawData.analysis || rawData;

  const graphLabels: Record<string, string> = {
    communication: "תקשורת",
    confidence: "ביטחון",
    reliability: "אמינות",
    role_fit: "התאמה לתפקיד",
    motivation: "מוטיבציה",
    availability: "זמינות",
    stability: "יציבות",
    customer_orientation: "שירותיות",
    clarity: "בהירות",
    engagement: "מעורבות",
  };

  const traits = Object.entries(data.interview_details.graph).map(
    ([key, value]) => ({
      name: graphLabels[key] || key,
      value: (value as number) * 10,
    })
  );

const percent = data.dashboard_view.match_percent;
  let title = "";

  if (percent >= 80) {
    list = data.interview_details.strengths;
    title = "חוזקות";
  } else if (percent >= 60) {
    list = data.interview_details.score_reasons;
    title = "סיבות לציון";
  } else {
    list = data.interview_details.weaker_points;
    title = "נקודות לשיפור";
  }

  return (
    <Box
      dir="rtl"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper sx={{ width: "90%", maxWidth: 900, p: 4 }}>

        {/* שם מועמד */}
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
          {data.dashboard_view.full_name}
        </Typography>

        {/* גרף */}
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={traits}>
            <XAxis
              dataKey="name"
              interval={0}
              tick={{
                fontSize: 12,
                fill: "#e53935",
                textAnchor: "middle",
              }}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Bar dataKey="value">
              {traits.map((_, i) => (
                <Cell key={i} fill="#bdbdbd" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </Paper>

      {/* פרופיל */}
      <Box sx={{ mt: 3, width: "90%", maxWidth: 900 }}>
         <Typography sx = {{fontWeight:"bold"}}>{title}</Typography>
        {list.map((item: string, i: number) => (
          <Typography key={i}>• {item}</Typography>
        ))}
      </Box>
    </Box>
  );
}