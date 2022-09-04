import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Rankings from "./pages/Rankings";
import About from "./pages/About";
import Company from "./pages/Company";
import Research from "./pages/Research";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <Router>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path="/company/:ticker" element={ <Company/> } />
        <Route path="/research" element={ <Research/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/" element={ <Rankings/> } />
      </Routes>
    </Router>
  );
}

export default App;
