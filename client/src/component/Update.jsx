import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { users } = location.state || {}; // safely destructure

  const [formData, setFormData] = useState({
    first_name: users?.first_name || "",
    last_name: users?.last_name || "",
    email: users?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `https://mern-crud-backend-9dpn.onrender.com/api/users/${id}`,
      formData
    );
    navigate("/Home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-[90%] max-w-md"
        onSubmit={handleUpdate}
      >
        <h2 className="text-xl font-bold text-center">Update User</h2>
        <input
          type="text"
          name="first_name"
          placeholder="Enter First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Enter Last Name"
          value={formData?.last_name}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData?.email}
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
