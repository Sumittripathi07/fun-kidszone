import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import AllKids from "./components/AllKids";
import AdminPage from "./components/AdminPage";
import UpdateKid from "./components/UpdateKid";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/allKids" element={<AllKids />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/updateKid" element={<UpdateKid />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
