"use client";

import { getAllUsers } from "@/app/services/user.service";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState("");
  
  useEffect(() => {
    getAllUsers().then((response) => {
      console.log(response);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setError(response.error);
      }
    });
  },
  []);

  return (
    <div></div>
  );
}