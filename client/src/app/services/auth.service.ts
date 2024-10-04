export async function login(username: string, password: string) {
  return await fetch("http://127.0.0.1:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
  .then((res) => res.json())
}
