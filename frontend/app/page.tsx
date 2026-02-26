"use client";

import { useState } from "react";

async function sendData(username: string, password: string) {
  const res = await fetch("https://localhost:7246/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      UserName: username,
      Password: password,
    }),
  });
  const text = await res.text();
  console.log(text);

  if (!res.ok) {
    return { success: false, message: text };
  }
  return { success: true, message: text };
}

async function getData(username: string) {
  const res = await fetch(`https://localhost:7017/api/Users/${username}`);
  const data = await res.json();
  console.log(data);
  return data;
}

interface UserData {
  userName: string;
  password: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setUserData(null);
    
    const resoult = await sendData(username, password);

    if (!resoult.success) {
      setMessage(resoult.message);
      return;
    }
    setMessage("Pomyślnie zapisano dane");

    const data = await getData(username);
    if (data) {
      setUserData(data);
    }


  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Zapisz dane</button>
      </form>

      {message && (
        <p>{message}</p>
      )}

      {userData && (
        <p>Zapisane dane pobrane z DB2: {userData.userName}:{userData.password}</p>
      )}
    </div>
  );
}
