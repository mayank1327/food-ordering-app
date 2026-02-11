import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuItemAPI, restaurantAPI, orderAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ROLES } from '../utils/constants';

const MenuItems = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getById(id),
        menuItemAPI.getByRestaurant(id)
      ]);
      setRestaurant(restaurantRes.data.data);
      setMenuItems(menuRes.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existing = cart.find(c => c.menuItemId === item._id);
    if (existing) {
      setCart(cart.map(c => 
        c.menuItemId === item._id 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, { menuItemId: item._id, name: item.name, price: item.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(c => c.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(menuItemId);
    } else {
      setCart(cart.map(c => 
        c.menuItemId === menuItemId ? { ...c, quantity } : c
      ));
    }
  };

  const createOrder = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setCreating(true);
    try {
      const orderData = {
        restaurantId: id,
        items: cart.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity
        }))
      };

      const response = await orderAPI.create(orderData);
      alert('Order created successfully! ' + 
        (user.role === ROLES.MEMBER 
          ? 'Manager will complete the payment.' 
          : 'You can checkout from Orders page.'));
      setCart([]);
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create order');
    } finally {
      setCreating(false);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button onClick={() => navigate('/restaurants')} style={{ marginBottom: '20px', padding: '8px 15px', cursor: 'pointer' }}>
        ← Back to Restaurants
      </button>

      <h2>{restaurant?.name}</h2>
      <p style={{ color: '#666' }}>{restaurant?.description}</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* Menu Items */}
        <div style={{ flex: 2 }}>
          <h3>Menu Items</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {menuItems.map((item) => (
              <div key={item._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name} {item.isVeg ? '🟢' : '🔴'}</h4>
                  <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>{item.description}</p>
                  <p style={{ margin: '5px 0', fontWeight: 'bold' }}>₹{item.price}</p>
                </div>
                <button onClick={() => addToCart(item)} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div style={{ flex: 1, position: 'sticky', top: '20px', height: 'fit-content' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#f9f9f9' }}>
            <h3>Cart ({cart.length})</h3>
            
            {cart.length === 0 ? (
              <p style={{ color: '#666' }}>Cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.menuItemId} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>{item.name}</p>
                        <p style={{ margin: '5px 0', color: '#666' }}>₹{item.price} x {item.quantity}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
                        <button onClick={() => removeFromCart(item.menuItemId)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #333' }}>
                  <h3>Total: ₹{totalAmount}</h3>
                  <button 
                    onClick={createOrder} 
                    disabled={creating}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      background: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontSize: '16px',
                      cursor: creating ? 'not-allowed' : 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    {creating ? 'Creating...' : 'Create Order'}
                  </button>
                  {user.role === ROLES.MEMBER && (
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                      Note: Manager will complete the payment
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;