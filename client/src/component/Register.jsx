import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";


const Register = () => {
    const navigate=useNavigate()
    const[formData,setFormData]=useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
    })
const handleChange=async(event)=>{
setFormData({...formData,[event.target.name]:event.target.value})
}

const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
       const response= await axios.post("https://mern-crud-backend-9dpn.onrender.com/api/users/register",formData);
        console.log("User created successfully : ",response);
        navigate("/")
    } catch (error) {
        console.log("Error : ",error)
    }
}

const handleLogin=async()=>{
    navigate("/")
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 
    bg-gradient-to-br from-blue-500 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
          Register
        </button>
        <button
         onClick={handleLogin}
          className="w-full my-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
