import styles from "../app/page.module.css";

import { Book } from "./book";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

export function Books() {
    const [pageURL, setPage] = useState('https://gutendex.com/books');
  
    const { isLoading, error, data } = useQuery({
      queryKey: [pageURL],
      cacheTime: 0,
      queryFn: () =>
        axios
          .get(pageURL)
          .then((res) => res.data),
    });
  
    if (isLoading) return (
      <div>Loading...</div>
    );
    if (error) return (
      <div>
        An error has occurred: {JSON.stringify(error)}
      </div>
    );
  
    return (
      <div className={styles.bookList}>
        <div className={styles.paginator}>
          {(data.previous) ? <Button variant="contained" onClick={() => {setPage(data.previous)}}>Previous Page</Button> : ""}
          {(data.next) ? <Button variant="contained" onClick={() => {setPage(data.next)}}>Next Page</Button> : ""}
        </div>
        {data.results.map((book, index) => (
          <Book object={book} key={index}/>
        ))}
        <div className={styles.paginator}>
          {(data.previous) ? <Button variant="contained" onClick={() => {setPage(data.previous)}}>Previous Page</Button> : ""}
          {(data.next) ? <Button variant="contained" onClick={() => {setPage(data.next)}}>Next Page</Button> : ""}
        </div>
      </div>
    )
  }
  