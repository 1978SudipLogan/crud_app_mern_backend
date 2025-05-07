import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //const[result,setResult]=useState("")
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-crud-backend-9dpn.onrender.com/api/users/login",
        user
      );

      localStorage.setItem("isLoggedIn", "true");

      //   localStorage.setItem("name","Sudip")
      //   console.log(response.data.username)
      const { message, username } = response.data;
      //console.log("Login Successfully:", message, "Username:", username);

      navigate("/Home");
    } catch (error) {
      // setResult(error.response.data.message)
      //  console.log("Not able to Login due to",error.response.data.message)
      console.log("Error : ", error);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 bg-gradient-to-br from-pink-500 to-slate-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <button
          className="w-full my-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300 "
          onClick={handleRegister}
        >
          Register
        </button>
        {/* <p>{result}</p> */}
      </form>
    </div>
  );
};

export default Login;
