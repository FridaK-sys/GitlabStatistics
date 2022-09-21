import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, HashRouter } from "react-router-dom";
import './App.css';
import Data from './components/Data';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}></Route>
        <Route path="/Data" element={<Data />} />
      </Routes>
    </Router>
  );

  function LayoutsWithNavbar() {
    return (
      <div>
        <Navbar />
        <main>
          <Outlet />  
        </main>
      </div>
    );
  }
} 

export default App;