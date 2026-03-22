import { type User } from "@/schemas/userSchema";

export async function sendData(userData: User) {
  const res = await fetch("https://localhost:3005/ocelot/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const text = await res.text();

  if (!res.ok) {
    return { success: false, message: text };
  }
  return { success: true, message: text };
}

export async function getData(username: string) {
  const res = await fetch(`https://localhost:3005/ocelot/users/${username}`);
  const data = await res.json();
  return data;
}