"use client";
import { useSearchUser } from "./SearchUser/store/stores";
import { useTranslations } from "next-intl";

export function SearchUser() {
  const t = useTranslations("DataPage");

  const username = useSearchUser((s) => s.username);

  const setUserId = useSearchUser((s) => s.setUserId);
  const submitSearch = useSearchUser((s) => s.submitSearch);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitSearch();
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-around max-w-2xs h-28 items-center"
        onSubmit={handleSubmit}
        data-testid="search-form"
      >
        <input
          className="border-2 border-gray-400 rounded-lg placeholder:text-gray-400 text-gray-600"
          id="userId"
          type="number"
          onChange={(e) => setUserId(Number(e.target.value))}
          required
          data-testid="user-id-input"
        />

        <button
          className="bg-blue-400 w-full rounded-lg hover:bg-blue-500"
          type="submit"
          data-testid="search-button"
        >
          {t("searchButton")}
        </button>
      </form>

      {username && <p className="text-gray-600" data-testid="username">{username}</p>}

    </div>
  );
}