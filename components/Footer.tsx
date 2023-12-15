import LoginLogout from "components/LoginLogout"

export function Footer() {
  return (
    <section className="opacity-60 text-sm leading-tight mt-24">
      <p className="my-4">
        <LoginLogout />
      </p>
      <p>
        chat with us on{" "}
        <a href="https://matrix.org" className="underline">
          matrix
        </a>
        :{" "}
        <a
          className="underline"
          href="https://matrix.to/#/#r.d:radical.directory">
          #r.d:radical.directory
        </a>
      </p>
      <p>
        email{" "}
        <a className="underline" href="mailto:radicaldirectory@protonmail.com">
          radicaldirectory@protonmail.com
        </a>
      </p>
      <p>
        contribute code/ideas on{" "}
        <a className="underline" href="https://github.com/radicaldirectory">
          github
        </a>
      </p>
      <p className="my-4">
        <a href="http://enlacezapatista.ezln.org.mx/wp-content/uploads/2018/08/Manifiesto_Borrador-Final.pdf">
          &ldquo;for a world in which many worlds fit&rdquo;
        </a>
      </p>
    </section>
  )
}
