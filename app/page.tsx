import Hero from "@/components/Hero";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Filled in by T13-T17. scroll-mt keeps the heading from hiding
          under the sticky header when "See my projects" jumps here. */}
      <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16">
        <h2 className="text-2xl font-semibold">{site.projectsSection.heading}</h2>
      </section>
    </main>
  );
}
