"use client";

import { useState } from "react";
import { updateUser } from "../services/user.service";
import { Modal, Box, Button, TextField } from "@mui/material";
import { User } from "../types/user";

export default function UpdateModal({ user, open, onClose, onUpdate } : {
  user: User,
  open: boolean,
  onClose: () => void,
  onUpdate: () => void,
}) {
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    password: user.password,
    role: user.role,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await updateUser(user.id, formData);

    if (response.error) {
      setError(response.error);
    } else {
      setError("");
      onUpdate();
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="update-user-modal-title"
      aria-describedby="update-user-modal-description"
    >
      <Box
        className="flex flex-col items-center justify-center p-8 bg-gray-900 shadow-lg rounded-lg"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h1
          id="update-user-modal-title"
          className="text-2xl font-semibold mb-6 text-center text-gray-200"
        >
          Update User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onClose}
            sx={{ marginBottom: 2 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
