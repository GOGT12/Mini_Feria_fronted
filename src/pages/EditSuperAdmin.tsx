import React, { useState } from "react";

interface AdminData {
  username: string,
  email: string,
  password?: string | undefined,
}



function EditSuperAdmin(){

  const [formData, setFormData] = useState<AdminData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const backendUrl ='http://localhost:3000/api/users/edit-super-admin';
      const jwtToken = localStorage.getItem('jwtToken');

      const res = await fetch(backendUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
        })
      } else {
        console.log('gg')
      }
    } catch (error) {
      console.error("Error al conectar con el backend o procesar la respuesta:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-600 w-full max-w-screen-md">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Edit Super Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="newUsername"
            className="block text-sm font-medium text-black mb-1"
            >New Username:
          </label>
          <input
            id="newUsername"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <label
            htmlFor="newEmail"
            className="block text-sm font-medium text-black mb-1"
            >New Email:
          </label>
          <input
            id="newEmail"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-black mb-1"
            >New Password:
          </label>
          <input
            id="newPassword"
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
          >Submit</button>
        </form>
      </div>
    </div>
  )
}


export default EditSuperAdmin;
