"use client";

import { login } from "@/app/services/auth.service";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const swal = withReactContent(Swal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.length) {
      setError("Username is required.");
      return;
    }

    if (!password.length) {
      setError("Password is required.");
      return;
    }

    try {
      const response = await login(username, password);

      if (response.status === 400 || response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("");

        swal.fire({
          text: "You have successfully logged in.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        localStorage.setItem("token", response.token);

        setUsername("");
        setPassword("");
      }
    } catch (e) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-200">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && !username.length)}
            helperText={error && !username.length ? "Username is required" : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            error={Boolean(error && !password.length)}
            helperText={error && !password.length ? "Password is required" : ""}
          />
          <Button
            type="submit"
            variant="contained"
            className="w-full py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-indigo-500 hover:underline">
            Register
          </a>
          .
        </p>
      </div>
    </div>
  );
}
