import CandidatePage from "./pages/CandidatePage";
import HRDashboard from "./pages/HRDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateDetails from "./components/CandidateDetails";
import CheckingData from "./components/CheckingData";
import NegativeMessage from "./components/NegativeMessage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CandidatePage />} />
          <Route path="/dashboard" element={<HRDashboard />} />
          <Route path="/candidate/:email" element={<CandidateDetails />} />
          <Route path="/CheckingData" element = {<CheckingData/>}/>
          <Route path="/NegativeMessage" element = {<NegativeMessage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
