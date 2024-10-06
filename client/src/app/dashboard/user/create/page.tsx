"use client";
import { createUser } from "@/app/services/user.service";
import { useState } from "react";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData({
      ...formData,
      role: event.target.value as string,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.username.length < 4) {
      setError("Username must be at least 4 characters long.");
      return;
    }

    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    const response = await createUser(formData);

    console.log(response);
    if (response.error) {
      setError(response.error);
    } else {
      setError("");
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          name: "",
          lastname: "",
          username: "",
          password: "",
          role: "",
        });
      } else if (response.status === 400) {
        setError("Username already exists.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-200">
          Create User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Lastname
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Lastname"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Role:
            </label>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              style={{ width: "100%", backgroundColor: "white" }}
              className=""
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.role}
                label="Role"
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"USER"}>User</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
                <MenuItem value={"MINI_ADMIN"}>Mini admin</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            type="submit"
            variant="contained"
            className="w-full py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Create
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-500 text-center">
            User created successfully.
          </p>
        )}
      </div>
    </div>
  );
}
