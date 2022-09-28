import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Issues from './components/Issues';
import Homepage from './components/Homepage';
import Commits from './components/Commits';
import CommitsToGraph from './components/CommitsToGraph';

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
        <Route path='/chart' element={<CommitsToGraph />} />
      </Routes>
    </Router>
  );
}

export default App;
