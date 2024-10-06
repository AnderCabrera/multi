"use client";

import {
  getAllUsers,
  deleteUser,
  getUserById,
} from "@/app/services/user.service";
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
import UpdateModal from "../components/UpdateModal";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "center",
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    color: theme.palette.grey[300],
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[800],
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[700],
  },
  "&:hover": {
    backgroundColor: theme.palette.grey[600],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const swal = withReactContent(Swal);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    const response = await getAllUsers();

    if (response.error) {
      console.log(response.error);
    } else {
      setUsers(response);
    }
  };

  const handleUpdateUser = async (id: number) => {
    await getUserById(id)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setUser(response);
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onUpdateUser = async () => {
    fetchUsers();
    onCloseModal();
  };

  const handleDeleteUser = async (id: number) => {
    const userId = localStorage.getItem("userId");

    if (Number(userId) === id) {
      swal.fire({
        text: "You can't delete yourself.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

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
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
            User Dashboard
          </h1>
          {/* Button to redirect to user creation page */}
          <div className="flex justify-center mb-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/dashboard/user/create")}
            >
              Create User
            </Button>
          </div>
          <div className="w-full mx-auto">
            <TableContainer
              className="mt-4"
              component={Paper}
              sx={{ backgroundColor: "#2D3748" }}
            >
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
                          onClick={() =>
                            user.id !== undefined && handleDeleteUser(user.id)
                          }
                          sx={{ marginRight: 1 }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() =>
                            user.id !== undefined && handleUpdateUser(user.id)
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
        {showModal && user && (
          <UpdateModal
            user={user}
            onClose={onCloseModal}
            onUpdate={onUpdateUser}
            open={showModal}
          />
        )}
      </div>
    </div>
  );
}
