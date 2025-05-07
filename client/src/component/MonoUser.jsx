import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MonoUser = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const heading = ["S.No", "First Name", "Last Name", "Email", "Update", "Delete", "ID"];

  const getUserById = async () => {
    if (id) {
      const response = await axios.get(`https://mern-crud-backend-9dpn.onrender.com/api/users/${id}`);
      setUser(response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-crud-backend-9dpn.onrender.com/api/users/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };


  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-700 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">User Details</h1>
        <div className="flex justify-end mb-4">
          <Link to="/newuser">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition">
              Add New User
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-blue-800 text-white">
              <tr>
                {heading.map((head, index) => (
                  <th key={index} className="px-4 py-2 border border-blue-900">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-gray-800">
              <tr className="hover:bg-blue-100 transition">
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">{user.first_name}</td>
                <td className="px-4 py-2 border">{user.last_name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <Link
                    to={`/update/${user._id}`}
                    state={{
                      users: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                      },
                    }}
                    className="text-blue-600 hover:text-yellow-500"
                  >
                    <FaUserAlt className="inline-block text-lg" />
                  </Link>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete User"
                  >
                    <MdDelete className="inline-block text-lg" />
                  </button>
                </td>
                <td className="px-4 py-2 border break-all">{user._id}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end ">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 mt-4 text-white px-4 py-2 rounded shadow-md transition-all"
          >
            Logout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MonoUser;
