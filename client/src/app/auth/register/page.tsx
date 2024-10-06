"use client";

import { register } from "@/app/services/auth.service";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    role: "ADMIN",
  });
  const [error, setError] = useState("");

  const swal = withReactContent(Swal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    const response = await register(formData);

    if (response.error) {
      setError(response.error);
    } else {
      setError("");
      if (response.status === 201) {
        swal.fire({
          text: "You have successfully registered.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setFormData({
          name: "",
          lastname: "",
          username: "",
          password: "",
          role: "ADMIN",
        });
      } else if (response.status === 400) {
        swal.fire({
          text: "Username already exists.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-200">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && !formData.name.length)}
          />
          <TextField
            label="Lastname"
            name="lastname"
            variant="outlined"
            fullWidth
            value={formData.lastname}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && !formData.lastname.length)}
          />
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && formData.username.length < 4)}
            helperText={
              error && formData.username.length < 4
                ? "Username must be at least 4 characters long."
                : ""
            }
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && formData.password.length < 4)}
            helperText={
              error && formData.password.length < 4
                ? "Password must be at least 4 characters long."
                : ""
            }
          />
          <Button
            type="submit"
            variant="contained"
            className="w-full py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Register
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-500 hover:underline">
            Login
          </a>
          .
        </p>
      </div>
    </div>
  );
}
