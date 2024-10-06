"use client";

import { useState } from "react";
import { updateUser } from "../services/user.service";
import {
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { User } from "../types/user";

export default function UpdateModal({
  user,
  open,
  onClose,
  onUpdate,
}: {
  user: User;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    password: "",
    role: user.role,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      role: e.target.value as string,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.lastname ||
      !formData.username ||
      !formData.password ||
      !formData.role
    ) {
      setError("All fields must be filled out.");
      return; 
    }

    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    if (user.id !== undefined) {
      const response = await updateUser(user.id, formData);
      if (response.error) {
        setError(response.error);
      } else {
        setError("");
        onUpdate();
      }
    } else {
      setError("User ID is missing.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="update-user-modal-title"
      aria-describedby="update-user-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#1F2937",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: "#D1D5DB", 
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
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
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
            InputProps={{
              style: { backgroundColor: "#374151", color: "#D1D5DB" },
            }}
            InputLabelProps={{
              style: { color: "#D1D5DB" },
            }}
            sx={{ marginBottom: 2 }}
          />
          <div>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size="small"
              fullWidth
              style={{ backgroundColor: "#374151" }}
            >
              <InputLabel id="role-select-label" sx={{ color: "#D1D5DB" }}>
                Role
              </InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={formData.role}
                onChange={handleSelectChange}
                sx={{ color: "#D1D5DB" }}
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onClose}
            sx={{ marginBottom: 2, color: "#D1D5DB", borderColor: "#6B7280" }} 
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#6366F1", 
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
