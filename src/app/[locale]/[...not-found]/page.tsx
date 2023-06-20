import Link from "next/link";
// FIXME: improve the page style & content
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Go back to <Link href="/">Home page</Link>
      </p>
    </div>
  );
}
