import React, { useState ,} from 'react';
import { useNavigate } from 'react-router-dom';
const RegistrationForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    password: '',
    username: '',
  });
  let username=formData.username;
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform API call to the backend to save user details in the database
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        for (const property in responseData) {
          console.log(`${property}: ${responseData[property]}`); // Inspect each property
        }

        
        
        
        console.log('User registered successfully!');
        navigate(`/user/${username}`)
      } else {
        
        console.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
      </label>

      <label>
        Mobile:
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
      </label>

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>

      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
