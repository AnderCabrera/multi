import { User } from "../types/user";

const token = localStorage.getItem("token");

export async function getAllUsers() {
  return await fetch("http://127.0.0.1:3000/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getUser(id: number) {
  return await fetch(`http://127.0.0.1:3000/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function createUser(user: User) {
  return await fetch("http://127.0.0.1:3000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
      role: user.role,
    }),
  }).then((res) => res.json());
}