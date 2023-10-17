import styles from "../app/page.module.css";

import { Book } from "./book";
import Button from '@mui/material/Button';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { Filter } from "./filter";

const DEFAULT_URL = 'https://gutendex.com/books';

export function Books() {
    const [pageURL, setPage] = useState(DEFAULT_URL);
    const [nameParam, setName] = useState('None');

    function handleFilter(name) {
      setName(name);
      setPage(DEFAULT_URL+'?search='+name);
    }
  
    const { isLoading, error, data } = useQuery({
      queryKey: [pageURL],
      queryFn: () =>
        axios
          .get(pageURL)
          .then((res) => res.data),
    });
  
    if (isLoading) return (
      <div>Getting your books...</div>
    );
    if (error) return (
      <div>
        An error has occurred: {JSON.stringify(error)}
      </div>
    );
  
    return (
      <div className={styles.bookList}>
        <div className={styles.filterResults}>
          <h4>Total Results: {data.count}</h4>
          <h4>{(nameParam != '') ? <span>Filtering results by: {nameParam}</span> : ''}</h4>
          <Filter handleFilter={handleFilter}/>
        </div>
        <div className={styles.paginator}>
          {(data.previous) ? <Button variant="contained" onClick={() => {setPage(data.previous)}}>Previous Page</Button> : ""}
          {(data.next) ? <Button variant="contained" onClick={() => {setPage(data.next)}}>Next Page</Button> : ""}
        </div>
        {data.results.map((book) => (
          <Book object={book} key={book.id}/>
        ))}
        <div className={styles.paginator}>
          {(data.previous) ? <Button variant="contained" onClick={() => {setPage(data.previous)}}>Previous Page</Button> : ""}
          {(data.next) ? <Button variant="contained" onClick={() => {setPage(data.next)}}>Next Page</Button> : ""}
        </div>
      </div>
    )
  }
  