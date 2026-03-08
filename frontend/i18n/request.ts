import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  let locale = store.get("locale")?.value;
  if (locale) {
    return {
      locale,
      messages: (await import(`@/messages/${locale}.json`)).default,
    };
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("Accept-Language");
  const browserLocale = acceptLanguage?.split(",")[0].split(";")[0].split("-")[0];
  console.log(browserLocale);

  const supported = ["pl", "en"];

  locale = supported.includes(browserLocale ?? "") ? browserLocale! : "en";
  
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
