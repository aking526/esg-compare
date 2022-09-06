import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Home from "./pages/Home";
import Rankings from "./pages/Rankings";
import About from "./pages/About";
import Company from "./pages/Company";
import Research from "./pages/Research";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import ComparePage from "./pages/ComparePage";
import CompanyApi from "./api/CompanyApi";
import QueryError from "./components/QueryError";

function App() {
  const names = useQuery<string[][], Error>(['names'], CompanyApi.getNames);

  if (names.isError) {
    return <QueryError message={names.error.message} />;
  }

  return (
    <Router>
      <TopBar names={names.data} />
      <NavBar />
      <Routes>
        <Route path="/company/:ticker" element={ <Company/> }/>
        <Route path="/compare" element={ <ComparePage /> }/>
        <Route path="/research" element={ <Research/> }/>
        <Route path="/about" element={ <About/> }/>
        <Route path="/rankings" element={ <Rankings/> }/>
        <Route path="/" element={ <Home/> }/>
      </Routes>
    </Router>
  );
}

export default App;
