"use client";

import { useAuthStore } from "@/component/LoginForm/store/stores";
import { useTranslations } from "next-intl";

export function LoginForm() {
  const t = useTranslations("LoginPage");

  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const message = useAuthStore((s) => s.message);
  const userData = useAuthStore((s) => s.userData);

  const setUsername = useAuthStore((s) => s.setUsername);
  const setPassword = useAuthStore((s) => s.setPassword);
  const submitLogin = useAuthStore((s) => s.submitLogin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitLogin();
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-around max-w-2xs h-28 items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-gray-400 rounded-lg placeholder:text-gray-400 text-gray-600"
          id="username"
          type="text"
          value={username}
          placeholder={t("usernamePlaceholder")}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="border-2 border-gray-400 rounded-lg placeholder:text-gray-400 text-gray-600"
          id="password"
          type="password"
          value={password}
          placeholder={t("passwordPlaceholder")}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="bg-blue-400 w-full rounded-lg hover:bg-blue-500"
          type="submit"
        >
          {t("loginButton")}
        </button>
      </form>

      {message && <p className="text-gray-600">{message}</p>}

      {userData && (
        <p className="text-gray-600">
          Zapisane dane pobrane z DB2: {userData.userName}:{userData.password}
        </p>
      )}
    </div>
  );
}