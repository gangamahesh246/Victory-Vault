import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Include the CSS file here
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    conformpassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformpassword) {
      toast.info('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (res.data.token) {
        navigate('/');
        toast.success('Account created successfully Please Login');
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('User already exists');
      } else if (error.response.status === 500) {
        toast.error('Server error');
      } else {
        toast.error('Server error');
      }
    }
  };



  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="conformpassword"
            placeholder="Conform Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="side-container">
        <h2>Hello, Friend!</h2>
        <p>Already have an account? Log in to get the latest sports updates.</p>
        <a href="/">Login</a>
      </div>
    </div>
  );
}

export default Signup;
