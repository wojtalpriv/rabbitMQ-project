import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Dopasuj wszystko OPRÓCZ api, _next, plików statycznych
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};