// src/pages/Companies.js
import { useState, useEffect } from 'react';
import { getCompanies, deleteCompany } from '../Api';
import { Link } from 'react-router-dom';

const Company = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      loadCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    <div>
      <h1>Companies</h1>
      <Link to="/company/new">Add New Company</Link>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            {company.companyName}
            <button onClick={() => handleDelete(company._id)}>Delete</button>
            <Link to={`/company/edit/${company._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Company;
