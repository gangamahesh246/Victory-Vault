import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If there's no token, redirect to login
      toast.error('You must log in to access this page');
      navigate('/'); // Redirect to the login page
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');

    // Show a success message
    toast.success('Logged out successfully');

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* <h2>Welcome to your Dashboard</h2> */}
      <button onClick={handleLogout} className='logout' >Logout</button>
      {/* <button onClick={() => navigate('/players/name/:name')}>view players</button> */}
      <div className='cricket_badminton'>
        <div>
          <h2>Cricket</h2>
          <img src="https://img.freepik.com/premium-photo/poster-tournament-with-cricket-ball-words-fem-it_1215343-10559.jpg?w=740" alt="image" className='cricket' onClick={() => handleLogout()} />
        </div>
        <div>
          <h2>Badminton</h2>
          <img src="https://img.freepik.com/premium-photo/this-continuous-line-drawing-features-badminton-player-midswing-their-form-outlined-by-glowing-neon-light-that-adds-dynamic-contemporary-element-vector-illustration_1214173-50234.jpg?w=740" className='cricket' onClick={() => handleLogout()} />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;