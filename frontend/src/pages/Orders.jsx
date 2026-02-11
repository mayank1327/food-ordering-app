import { useState, useEffect, useContext } from 'react';
import { orderAPI, paymentAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ROLES } from '../utils/constants';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingOrderId, setProcessingOrderId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, paymentsRes] = await Promise.all([
        orderAPI.getAll(),
        paymentAPI.getAll()
      ]);
      setOrders(ordersRes.data.data);
      setPaymentMethods(paymentsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (orderId) => {
    if (paymentMethods.length === 0) {
      alert('No payment method found! Admin needs to add payment methods.');
      return;
    }

    const confirmPlace = window.confirm('Are you sure you want to place this order and make payment?');
    if (!confirmPlace) return;

    setProcessingOrderId(orderId);
    try {
      const defaultPayment = paymentMethods.find(pm => pm.isDefault) || paymentMethods[0];
      await orderAPI.place(orderId, defaultPayment._id);
      alert('Order placed successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to place order');
    } finally {
      setProcessingOrderId(null);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmCancel) return;

    setProcessingOrderId(orderId);
    try {
      await orderAPI.cancel(orderId);
      alert('Order cancelled successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to cancel order');
    } finally {
      setProcessingOrderId(null);
    }
  };

  const canPlaceOrder = user.role === ROLES.ADMIN || user.role === ROLES.MANAGER;
  const canCancelOrder = user.role === ROLES.ADMIN || user.role === ROLES.MANAGER;

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>My Orders ({orders.length})</h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <p>No orders yet. Start ordering from restaurants!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                background: 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>Order #{order.orderNumber}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>{order.restaurantName}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    background: order.status === 'pending' ? '#ffc107' : 
                               order.status === 'confirmed' ? '#28a745' : 
                               order.status === 'cancelled' ? '#dc3545' : '#6c757d',
                    color: 'white'
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}>
                    Payment: {order.paymentStatus.toUpperCase()}
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.subtotal}</span>
                  </div>
                ))}
                <div style={{ 
                  borderTop: '2px solid #333', 
                  marginTop: '10px', 
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  <span>Total:</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                {order.status === 'pending' && canPlaceOrder && (
                  <button
                    onClick={() => handlePlaceOrder(order._id)}
                    disabled={processingOrderId === order._id}
                    style={{
                      padding: '10px 20px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: processingOrderId === order._id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {processingOrderId === order._id ? 'Processing...' : 'Place Order & Pay'}
                  </button>
                )}

                {order.status !== 'cancelled' && order.status !== 'delivered' && canCancelOrder && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={processingOrderId === order._id}
                    style={{
                      padding: '10px 20px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: processingOrderId === order._id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {processingOrderId === order._id ? 'Processing...' : 'Cancel Order'}
                  </button>
                )}

                {!canPlaceOrder && order.status === 'pending' && (
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    ⚠️ Only Manager/Admin can place this order
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;