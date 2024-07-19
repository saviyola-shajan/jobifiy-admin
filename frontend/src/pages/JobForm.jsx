import  { useState, useEffect } from 'react';
import { addJob, getCompanies } from '../Api';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob({ title, description, company, location, salary });
      // Handle successful job addition (e.g., show a message or redirect)
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        required
      />
      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      >
        <option value="">Select Company</option>
        {companies.map((comp) => (
          <option key={comp._id} value={comp._id}>
            {comp.companyName}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;
