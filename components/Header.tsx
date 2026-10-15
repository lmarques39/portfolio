import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import { site } from "@/content/site";

// On every page (it's rendered in the root layout), so the CV is always
// one click away (spec §2, US-01). No menu: at 375px both items fit on one row.
export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <ExternalLink
          href={site.cv.href}
          className="rounded-full border border-foreground/20 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          {site.cv.label}
        </ExternalLink>
      </div>
    </header>
  );
}
