import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import AllKids from "./components/AllKids";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/allKids" element={<AllKids />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
