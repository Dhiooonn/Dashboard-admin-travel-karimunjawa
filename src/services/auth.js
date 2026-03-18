import users from "@/data/users.json";
export function login(email, password) {
    var user = users.find(function (u) { return u.email === email && u.password === password; });
    if (!user) {
        throw new Error("Email atau password salah");
    }
    return user;
}
