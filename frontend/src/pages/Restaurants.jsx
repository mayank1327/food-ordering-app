import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Restaurants ({restaurants.length})</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            onClick={() => navigate(`/restaurants/${restaurant._id}`)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              background: 'white'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{restaurant.name}</h3>
            <p style={{ color: '#666', margin: '5px 0' }}>{restaurant.description}</p>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span><strong>Cuisine:</strong> {restaurant.cuisine}</span>
              <span><strong>Rating:</strong> ⭐ {restaurant.rating}</span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
              📍 {restaurant.address}, {restaurant.country}
            </div>
          </div>
        ))}
      </div>

      {restaurants.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
          No restaurants available in your region
        </p>
      )}
    </div>
  );
};

export default Restaurants;