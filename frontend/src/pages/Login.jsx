import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/restaurants');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login to Food Ordering App</h2>
      
      {error && (
        <div style={{ padding: '10px', background: '#fee', color: '#c00', marginBottom: '20px', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="nick@avengers.com"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="password123"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Test Accounts:</p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Admin: nick@avengers.com</p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Manager (India): marvel@avengers.com</p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Manager (America): america@avengers.com</p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Member (India): thanos@avengers.com</p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>Password: password123</p>
      </div>
    </div>
  );
};

export default Login;