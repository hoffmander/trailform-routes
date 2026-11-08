import type { Metadata } from "next";
import Link from "next/link";

import RouteMap from "@/components/RouteMap/RouteMap";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Create a route",
};

export default function CreatePage() {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <Link href="/" className={styles.wordmark}>
          Trailform Routes
        </Link>
      </header>
      <div className={styles.mapArea}>
        <RouteMap />
      </div>
    </div>
  );
}
