"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2D3748' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App
        </Typography>
        <Button color="inherit" onClick={handleDashboard}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
