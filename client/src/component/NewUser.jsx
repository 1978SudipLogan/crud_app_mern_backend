import axios from "axios";
import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewUser = () => {
const location=useLocation()
console.log(location)
    const navigate=useNavigate()
const [users,setUsers]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:""
})
    const handleChange=async (event)=>{
        setUsers({...users,[event.target.name]:event.target.value})
    }

const handleSubmit=async(event)=>{
    event.preventDefault();
    try {
        await axios.post("https://mern-crud-backend-9dpn.onrender.com/api/users",users);
        console.log("successfully posted")
        navigate("/Home")

    } catch (error) {
        console.log("Error : ",error)
    }
}



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-[90%] max-w-md">
      <h2 className="text-xl font-bold text-center">New User</h2>
        <input
          type="text"
          name="first_name"
          placeholder="Enter firstName"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter lastName"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewUser;
