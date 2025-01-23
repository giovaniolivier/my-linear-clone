import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LinearClone from './components/LinearClone';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route vers la page de connexion */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route vers la page LinearClone */}
        <Route path="/dashboard" element={<LinearClone />} />
      </Routes>
    </Router>
  );
}

export default App;
