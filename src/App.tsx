import CandidatePage from "./pages/CandidatePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateDetails from "./components/CandidateDetails";
import FirstMassage from "./components/firstMassage";
import SuccessMessage from "./components/SuccessMessage";
import CheckingData from "./components/CheckingData";
import NegativeMessage from "./components/NegativeMessage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CandidatePage />} />
          <Route path="/candidate/:email" element={<CandidateDetails />} />
          <Route path="/firstMassage" element = {<FirstMassage/>}/>
          <Route path="/SuccessMessage" element = {<SuccessMessage/>}/>
          <Route path="/CheckingData" element = {<CheckingData/>}/>
          <Route path="/NegativeMessage" element = {<NegativeMessage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
