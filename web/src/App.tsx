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
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import Compare from "./pages/Compare";
import CompaniesApi from "./api/CompaniesApi";
import QueryError from "./components/QueryError";

function App() {
  const names = useQuery<string[][], Error>(['names'], CompaniesApi.getNames);

  if (names.isError) {
    return <QueryError message={names.error.message} />;
  }

  return (
    <Router>
      <TopBar names={names.data} />
      <NavBar />
      <Routes>
        <Route path="/company/:ticker" element={ <Company/> }/>
        <Route path="/compare" element={ <Compare /> }/>
        <Route path="/about" element={ <About/> }/>
        <Route path="/rankings" element={ <Rankings/> }/>
        <Route path="/" element={ <Home/> }/>
      </Routes>
    </Router>
  );
}

export default App;
