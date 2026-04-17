import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import PercentIcon from "@mui/icons-material/Percent";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

type Candidate = {
  name: string;
  phone: string;
  email: string;
  profile: string;
  score: number;
};
type Props = {
  data: Candidate[];
  rawData: any; // 👈 מעבירים גם את ה-API המקורי
};

type Status = {
  text: string;
  color: "success" | "warning";
  reason: string;
};

const getStatus = (score: number): Status => {
  if (score >= 70) {
    return { text: "גבוה", color: "success", reason: "התאמה גבוהה" };
  }

  return { text: "בינוני", color: "warning", reason: "התאמה בינונית" };
};

const isMobile = window.innerWidth < 600;

const columns = [
  { icon: <PersonIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "שם מלא" },
  { icon: <PhoneIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "טלפון" },
  { icon: <EmailIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "מייל" },
  { icon: <BadgeIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "פרופיל" },
  { icon: <PercentIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "אחוזי התאמה" },
  { icon: <InfoIcon sx={{ color: "#e53935", fontSize: 16 }} />, label: "סטטוס" },
];

export default function CandidatesTable({ data, rawData  }: Props) {
  const navigate = useNavigate();
  return (
    <TableContainer
      component={Paper}
        sx={{
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          border: "1px solid #e53935",
        }}
    >
      <Table>
        {/* HEADER */}
        <TableHead
          sx={{
            background: "#eeeeee",
            "& .MuiTableCell-root": {
              color: "#e53935",
              fontWeight: "bold",
              textAlign: "center",
              borderBottom: "1px solid #e53935",
            },
          }}
        >
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i} align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {col.icon}
                  {!isMobile && col.label}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {data.map((item, index) => {
            const status = getStatus(item.score);
            const rowColor = status.color === "success" ? "#2e7d32" : "#f57c00";

            return (
              <TableRow
                key={index}
                onClick={() =>
                  navigate(`/candidate/${item.email}`, {
                    state: rawData,
                  })
                }
                sx={{
                  cursor: "pointer",
                  "& td": {
                    color: rowColor,
                    textAlign: "center",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "#fafafa",
                  },
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.profile}</TableCell>
                <TableCell>{item.score}%</TableCell>
                <TableCell>{status.text}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
