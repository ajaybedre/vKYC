import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import React from "react";
import Dashboard from "./components/Dashboard";
import UploadFiles from "./components/UploadFiles";

const AppContext = React.createContext();

function useAppContext() {
  return React.useContext(AppContext);
}

function App() {
  const [aadhaarNumber, setAadhaarNumber] = React.useState("");
  const [bank, setBank] = React.useState("");

  return (
    <div className="app">
      <AppContext.Provider
        value={{
          aadhaarNumber,
          setAadhaarNumber,
          bank,
          setBank,
        }}
      >
        <header>vKYC Portal</header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route exact path="dashboard">
              <Route path="upload" element={<UploadFiles />} />
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <footer></footer>
      </AppContext.Provider>
    </div>
  );
}

export { App, useAppContext };
