import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (res.data.token) {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          console.log(res.data.token);
          toast.success('Login successful');
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Invalid credentials');
      } else if (error.response.status === 500) {
        toast.error('Server error');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  
  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="side-container">
        <h2>Welcome Back!</h2>
        <p>Don't have an account? Sign up now to start getting live sports updates!</p>
        <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}

export default Login;