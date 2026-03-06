"use client";

import { ThemeToggle } from "@/component/ThemeToggle";
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
    <div className="bg-white dark:bg-gray-800 flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="flex flex-col justify-around max-w-2xs h-28 items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="border-2 border-gray-400 rounded-lg placeholder:text-gray-400 text-gray-600"
            id="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className="border-2 border-gray-400 rounded-lg placeholder:text-gray-400 text-gray-600"
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-blue-400 w-full rounded-lg hover:bg-blue-500"
            type="submit"
          >
            Zapisz dane
          </button>
        </form>

        {message && <p className="text-gray-600">{message}</p>}

        {userData && (
          <p className="text-gray-600">
            Zapisane dane pobrane z DB2: {userData.userName}:{userData.password}
          </p>
        )}
      </div>
    </div>
  );
}
