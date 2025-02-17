import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LinearClone from './components/LinearClone';
import MyIssues from './components/MyIssues';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<LinearClone />} />
        <Route path="/my-issues/assigned" element={<MyIssues />} />
      </Routes>
    </Router>
  );
}

export default App;
