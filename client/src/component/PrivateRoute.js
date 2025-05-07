import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // or use token

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
