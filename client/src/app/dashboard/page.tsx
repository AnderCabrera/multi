"use client";

import { getAllUsers, deleteUser } from "@/app/services/user.service";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { User } from "../types/user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const swal = withReactContent(Swal);

  const fetchUsers = async () => {
    const response = await getAllUsers();

    if (response.error) {
      console.log(response.error);
    } else {
      setUsers(response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
    .then((response) => {
      if (response.status === 200) {
        swal.fire({
          text: "User deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      } else if (response.statusCode === 403) {
        swal.fire({
          text: "You don't have permission to perform this action.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-200">
          Dashboard
        </h1>
        <div className="w-full mx-auto">
          <TableContainer className="mt-4" component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Lastname</StyledTableCell>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>Role</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell>{user.lastname}</StyledTableCell>
                    <StyledTableCell>{user.username}</StyledTableCell>
                    <StyledTableCell>{user.role}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() =>
                          console.log("edit user with id: " + user.id)
                        }
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
