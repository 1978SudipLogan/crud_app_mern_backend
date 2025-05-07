import './App.css';
import Home from './component/Home';
import Update from './component/Update';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewUser from './component/NewUser';
import MonoUser from './component/MonoUser';
import Login from './component/Login';
import Register from './component/Register';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute>
            <Home />
          </PrivateRoute>} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/user/:id" element={<MonoUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
