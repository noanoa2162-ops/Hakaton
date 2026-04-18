import Dashboard from "../components/Dashboard";
// import CandidateDetails from "../components/CandidateDetails";
// import CandidatesTable from "../components/CandidatesTable";

export type ApiData = {
  dashboard_view: {
    full_name: string;
    email: string;
    phone: string;
    match_percent: number;
    status: string;
  };
  interview_details: {
    graph: Record<string, number>;
    strengths: string[];
    weaker_points: string[];
    score_reasons: string[];
  };
};
const data = {
  dashboard_view: {
    full_name: "נועה לוי",
    email: "noa@example.com",
    phone: "0501234567",
    match_percent: 80,
    status: "מתאים מאוד",
  },
  interview_details: {
    graph: {
      communication: 8,
      confidence: 9,
      reliability: 8,
      role_fit: 8,
      motivation: 8,
      availability: 7,
      stability: 8,
      customer_orientation: 8,
      clarity: 8,
      engagement: 7,
    },
    strengths: [
      "ביטחון עצמי גבוה וכישורי תקשורת מרשימים",
      "פרופיל אמין ומחויב עם התאמה טובה לתפקיד",
    ],
    weaker_points: ["יש לבדוק זמינות נמוכה יחסית"],
    score_reasons: ["ציונים גבוהים בפרמטרים מרכזיים"],
  },
};
// const candidates = [
//   {
//     name: data.dashboard_view.full_name,
//     phone: data.dashboard_view.phone,
//     email: data.dashboard_view.email,
//     profile: "Frontend",
//     score: data.dashboard_view.match_percent,
//   },
// ];

export default function CandidatePage() {
  return (
    <>
      <Dashboard data={data} />
    </>
  );
}