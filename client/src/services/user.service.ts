import { User } from "../types/user";
import 'dotenv/config';

let token: string | null = null;

if (typeof window !== 'undefined') 
  token = localStorage.getItem("token");

export async function getAllUsers() {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getUserById(id: number) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function deleteUser(id: number) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

export async function createUser(user: User) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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

export async function updateUser(id: number, user: User) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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