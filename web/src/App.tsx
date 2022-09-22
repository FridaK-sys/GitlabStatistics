import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Data from './components/Data';

function App() {
  
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </Router>
  );
}

export default App;
