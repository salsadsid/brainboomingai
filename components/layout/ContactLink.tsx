import { contact } from "@/config/site";

/**
 * Inline link to however the project is currently reached — GitHub Issues now,
 * a mailbox once one exists. Pages use this instead of building their own
 * `mailto:` so a change of channel happens in config/site.ts and nowhere else.
 */
export default function ContactLink({
  className = "text-primary hover:underline",
}: {
  className?: string;
}) {
  return (
    <a
      href={contact.href}
      {...(contact.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={className}
    >
      {contact.label}
    </a>
  );
}
