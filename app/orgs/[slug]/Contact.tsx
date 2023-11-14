export function Contact({
  contactKVs,
}: {
  contactKVs: Record<string, string | undefined>
}) {
  return (
    <ul className="py-4 text-sm font-body columns-2 opacity-60">
      {contactKVs.email && (
        <li>
          <a href={`mailto: ${contactKVs.email}`}>{contactKVs.email}</a>
        </li>
      )}
      {contactKVs.website && (
        <li>
          <a href={contactKVs.website}>{contactKVs.website}</a>
        </li>
      )}
      {contactKVs.twitter && (
        <li>
          TW:{" "}
          <a href={`https://twitter.com/${contactKVs.twitter.split("@")[1]}`}>
            {contactKVs.twitter}
          </a>
        </li>
      )}
      {contactKVs.instagram && (
        <li>
          IG:{" "}
          <a
            href={`https://instagram.com/${
              contactKVs.instagram.split("@")[1]
            }`}>
            {contactKVs.instagram}
          </a>
        </li>
      )}
      {contactKVs.facebook && (
        <li>
          FB:{" "}
          <a href={`https://facebook.com/${contactKVs.facebook.split("/")[1]}`}>
            {contactKVs.facebook}
          </a>
        </li>
      )}
      {contactKVs.newsletter && (
        <li>
          <a href={contactKVs.newsletter}>Newsletter</a>
        </li>
      )}
      {contactKVs.linktree && (
        <li>
          <a href={contactKVs.linktree}>Linktree</a>
        </li>
      )}
    </ul>
  )
}
