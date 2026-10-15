import ExternalLink from "@/components/ExternalLink";
import { site } from "@/content/site";

// Top of the home page: who I am, what I use, and the two main actions
// (CV and projects). All text comes from site.ts (NFR-03).
export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{site.name}</h1>
      <p className="mt-2 text-lg text-foreground/70">{site.role}</p>
      <p className="mt-6 max-w-2xl leading-7">{site.hero.intro}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {site.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-foreground/5 px-3 py-1 text-sm"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <ExternalLink
          href={site.cv.href}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {site.cv.label}
        </ExternalLink>
        <a
          href="#projects"
          className="rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          {site.hero.projectsLinkLabel}
        </a>
      </div>
    </section>
  );
}
