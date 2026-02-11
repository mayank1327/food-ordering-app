import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Restaurants from './pages/Restaurants';
import MenuItems from './pages/MenuItems';
import Orders from './pages/Orders';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/restaurants" /> : <Login />} 
        />
        
        <Route 
          path="/restaurants" 
          element={
            <PrivateRoute>
              <Restaurants />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/restaurants/:id" 
          element={
            <PrivateRoute>
              <MenuItems />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/orders" 
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route path="*" element={<Navigate to="/restaurants" />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
