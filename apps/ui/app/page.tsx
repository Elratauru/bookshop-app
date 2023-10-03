'use client';

import styles from "./page.module.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Books } from '../components/books';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.mainText}>
          This page lets you browse over 70k books and add them to your favourites!
        </h1>
        <p className={styles.homeDesc}>
          To create an user, to to the link at the top right. All bookmarks are stored on a JSON Database using lowdb.
        </p>
      </section>
      <section>
        <h2 className={styles.booksTitle}>Book List</h2>
        <QueryClientProvider client={queryClient}>
          <Books/>
        </QueryClientProvider>
      </section>
    </main>
  )
}
