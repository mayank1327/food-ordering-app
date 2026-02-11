import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={{
      background: '#007bff',
      padding: '15px 20px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Food Ordering App</h3>
        <Link to="/restaurants" style={{ color: 'white', textDecoration: 'none' }}>Restaurants</Link>
        <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span>{user.name} ({user.role} - {user.country})</span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 15px',
            background: 'white',
            color: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;