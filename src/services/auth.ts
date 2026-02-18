import users from "@/data/users.json"

export function login(email: string, password: string) {
  const user = (users as Array<{email: string; password: string}>).find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    throw new Error("Email atau password salah")
  }

  return user
}