// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Company from './pages/Company';
import CompanyForm from './pages/CompanyForm';
import Jobs from './pages/Jobs';
import JobForm from './pages/JobForm';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoutes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<PrivateRoute><Company /></PrivateRoute>} />
        <Route path="/company/new" element={<PrivateRoute><CompanyForm /></PrivateRoute>} />
        <Route path="/company/edit/:id" element={<PrivateRoute><CompanyForm /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/job/new" element={<PrivateRoute><JobForm /></PrivateRoute>} />
        <Route path="/job/edit/:id" element={<PrivateRoute><JobForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
