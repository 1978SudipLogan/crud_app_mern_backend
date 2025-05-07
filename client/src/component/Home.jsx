import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const heading = [
    "S.No",
    "First Name",
    "Last Name",
    "Email",
    "Update",
    "Delete",
    "ID",
  ];

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://mern-crud-backend-9dpn.onrender.com/api/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-crud-backend-9dpn.onrender.com/api/users/${id}`);
      setUsers((prevUser) => prevUser.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gradient-to-br from-pink-500 to-blue-600 min-h-screen p-4">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-center text-4xl font-bold text-yellow-200 mb-6">
          Welcome
        </h1>

        <div className="flex justify-between mb-4">
          <Link to="/newuser">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition-all">
              Add New User
            </button>
           
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800  text-white px-4 py-2 rounded shadow-md transition-all"
          >
            Logout
          </button>
        </div>
       
       

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-green-800 text-white">
              <tr>
                {heading.map((head, idx) => (
                  <th key={idx} className="px-4 py-3">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((ele, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-green-100 transition duration-200"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{ele.first_name}</td>
                  <td className="px-4 py-2">{ele.last_name}</td>
                  <td className="px-4 py-2">{ele.email}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/update/${ele._id}`}
                      state={{
                        users: {
                          first_name: ele.first_name,
                          last_name: ele.last_name,
                          email: ele.email,
                        },
                      }}
                      className="text-green-700 hover:text-yellow-500"
                    >
                      <FaUserAlt className="inline-block" />
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(ele._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete className="inline-block" />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-500 break-words">
                    {ele._id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       

        {users.length === 0 && (
          <p className="text-white text-center mt-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
