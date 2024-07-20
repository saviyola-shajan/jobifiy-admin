import{ useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCompany, getCompanies, addCompany } from '../Api';

const CompanyForm = () => {
  const [company, setCompany] = useState({ companyName: '', email: '', phoneNumber: '', address: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadCompany();
    }
  }, [id]);

  const loadCompany = async () => {
    const response = await getCompanies();
    const company = response.data.find((c) => c._id === id);
    setCompany(company);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCompany(id, company);
    } else {
      await addCompany(company);
    }
    navigate('/companies');
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Add'} Company</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          value={company.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input
          type="email"
          name="email"
          value={company.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phoneNumber"
          value={company.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={company.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CompanyForm;
