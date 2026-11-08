import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Trailform Routes</span>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.title}>One route link for the whole group.</h1>
        <p className={styles.lede}>
          Draw or upload an off-road route, post the link in Discord, and
          everyone opens it on their phone and downloads it into onX, Gaia, or
          whatever GPS app they run. No account, no paywall.
        </p>
        <Link href="/create" className={styles.primary}>
          Create a route
        </Link>
      </section>

      <footer className={styles.footer}>
        <p>Built for Trailform Collective.</p>
      </footer>
    </main>
  );
}
