import Link from "next/link";

export default function About() {
  // throw new Error("This is an error");
  return (
    <>
      <h1>About</h1>
      <Link href="/">
        Link to Home Page
      </Link>
    </>
  );
}
