import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Issues from './components/Issues';
import Homepage from './components/Homepage';
import Commits from './components/Commits';
import { ThemeProvider } from './context/ThemeProvider';
import Settings from './components/Settings';
import CommitsToGraph from './components/CommitsToGraph';

function App() {

  return (
    <HashRouter>
      <ThemeProvider>
        <div className='mb-4'>
          <Navigation />
        </div>
        <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/issues" element={<Issues />} />
              <Route path='/commits' element={<Commits />} />
              <Route path='/chart' element={<CommitsToGraph />} />
              <Route path='/settings' element={<Settings />} />  
          </Routes>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;