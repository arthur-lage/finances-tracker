import { Link } from "react-router-dom";

import { House } from "@phosphor-icons/react";
import NotFoundIllustration from "../assets/not_found.svg";

export function NotFound() {
  return (
    <div className="bg-app">
      <div className="flex flex-col gap-6 fade-in items-center justify-center min-h-screen">
        <h1 className="font-jost font-bold text-white text-4xl">404</h1>

        <img
          className="w-[260px] mt-8"
          src={NotFoundIllustration}
          alt="Page not found"
        />

        <h2 className="font-jost text-zinc-300 px-8 text-center text-xl">
          Sorry, we could not find this page.
        </h2>
        <Link
          className="mt-10 flex items-center gap-2 font-jost text-[22px] font-semibold text-white"
          to="/"
        >
          <House weight="fill" />
          <span>Go back to home page</span>
        </Link>
      </div>
    </div>
  );
}
