// Every link that opens in a new tab goes through here, so CV, GitHub,
// LinkedIn, Live preview and Code all behave the same way (plan §2.4).
type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
