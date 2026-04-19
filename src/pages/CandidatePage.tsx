import { useState } from "react";
import Dashboard from "../components/Dashboard";
import FirstMassage from "../components/firstMassage";

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

export default function CandidatePage() {
  const [analysisResult, setAnalysisResult] = useState<ApiData | null>(null);

  const handleAnalysisComplete = (data: ApiData) => {
    setAnalysisResult(data);
  };

  return (
    <>
      {!analysisResult && (
        <FirstMassage onAnalysisComplete={handleAnalysisComplete} />
      )}
      {analysisResult && <Dashboard data={analysisResult} />}
    </>
  );
}