// src/pages/Jobs.js
import  { useState, useEffect } from 'react';
import { getJobs, deleteJob } from '../Api';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await getJobs();
    setJobs(response.data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  return (
    <div>
      <h1>Jobs</h1>
      <Link to="/job/new">Add New Job</Link>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.title}
            <button onClick={() => handleDelete(job._id)}>Delete</button>
            <Link to={`/job/edit/${job._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
