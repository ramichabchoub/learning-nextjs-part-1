import styles from "./styles.module.css";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>Nested nav for user page</nav>
      <main className={styles.main}>{children}</main>
    </>
  );
}
