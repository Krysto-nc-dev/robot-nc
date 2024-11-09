import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// Le middleware protège toutes les routes, y compris celles de l'API et des routes TRPC
export default authMiddleware({
  // `publicRoutes` permet de spécifier des routes publiques accessibles sans authentification
  publicRoutes: ["/site", "/api/uploadthing"],

  // Fonction appelée avant l'authentification
  async beforeAuth(auth, req) {},

  // Fonction appelée après l'authentification
  async afterAuth(auth, req) {
    // Récupère l'URL de la requête
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString();
    let hostname = req.headers;

    // Construit le chemin d'accès en incluant les paramètres de recherche
    const pathWithSearchParams = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

    // Vérifie si un sous-domaine personnalisé est présent
    const customSubDomain = hostname
      .get("host")
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    // Si un sous-domaine est détecté, on réécrit l'URL en fonction du sous-domaine
    if (customSubDomain) {
      return NextResponse.rewrite(
        new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
      );
    }

    // Redirige vers une URL spécifique si la requête est pour la page de connexion
    if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
      return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
    }

    // Si la route est la racine ou "site", réécrit l'URL pour aller vers "/site"
    if (
      url.pathname === "/" ||
      (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      return NextResponse.rewrite(new URL("/site", req.url));
    }

    // Si la route commence par "/agency" ou "/subaccount", réécrit simplement l'URL
    if (
      url.pathname.startsWith("/agency") ||
      url.pathname.startsWith("/subaccount")
    ) {
      return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
    }
  },
});

// Config pour Next.js : indique les routes auxquelles ce middleware doit s'appliquer
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
