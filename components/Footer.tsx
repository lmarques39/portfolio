import ExternalLink from "@/components/ExternalLink";
import { site } from "@/content/site";

const linkClass = "underline-offset-4 hover:underline";

// On every page (it's rendered in the root layout), so contact is always
// one click away (spec §2, US-02, US-03).
export default function Footer() {
  const { contact } = site;

  return (
    <footer className="mt-auto border-t border-foreground/10">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center">
        <h2 className="font-semibold">{contact.heading}</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm justify-center">
          <li>
            {/* The visible text is the address itself, so it can still be
                read and copied with no mail app (US-02, plan §2). */}
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
          </li>
          <li>
            <ExternalLink href={contact.githubUrl} className={linkClass}>
              {contact.githubLabel}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={contact.linkedinUrl} className={linkClass}>
              {contact.linkedinLabel}
            </ExternalLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
