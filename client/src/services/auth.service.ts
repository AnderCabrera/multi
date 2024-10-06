import { User } from "../types/user";

export async function login(username: string, password: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
}

export async function register(user: User) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
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
