import Link from "next/link";
import { site } from "@/content/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: site.meta.notFoundTitle,
};

// Shown for any URL that doesn't exist. It renders inside the root layout,
// so the header and footer stay the same as on every other page (US-09).
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-7xl font-bold tracking-tight text-foreground/20">404</p>
      <h1 className="mt-4 text-xl font-semibold">{site.notFound.message}</h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {site.notFound.backHomeLabel}
      </Link>
    </main>
  );
}
