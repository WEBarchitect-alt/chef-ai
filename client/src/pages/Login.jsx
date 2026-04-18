import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);
    alert("Logged in!");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 text-black"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 text-black"
      />
      <button onClick={login} className="bg-red-600 px-6 py-2">
        Login
      </button>
    </div>
  );
}