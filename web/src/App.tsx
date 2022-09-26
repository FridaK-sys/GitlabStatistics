import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Issues from './components/Issues';
import Homepage from './components/Homepage';
import Commits from './components/Commits';

function App() {
  
  return (
    <Router>
      <div className='mb-4'>
        <Navigation />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/issues" element={<Issues />} />
        <Route path='/commits' element={<Commits />} />
      </Routes>
    </Router>
  );
}

export default App;
