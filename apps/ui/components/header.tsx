'use client';

import axios from 'axios';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react';
import styles from "../app/page.module.css";

const queryClient = new QueryClient();
const API_URL = 'http://localhost:4000/'

export function Header() {
    const [userid, setUserId] = useState<null|string>(null);

    useEffect(() => {
        setUserId(localStorage.getItem('user_id'));
    }, []);

    return (
        <header>
            <div className="logo"><a href="/">Bookshop App</a></div>
            <nav className="user">
                <QueryClientProvider client={queryClient}>
                    {(userid !== null) ? <User id={userid}/> : <a href="/createUser"><span>Create User</span></a>}
                </QueryClientProvider>
                {(userid !== null) ? <button className="logout" onClick={(e) => { clearStorage(e)}}>Logout</button> : ""}
            </nav>
        </header>
    );
};

function clearStorage(e){
    e.preventDefault();
    localStorage.clear();
    location.reload();
}

function User(attributes) {
    const { isLoading, error, data } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        axios
          .get(API_URL + 'users/' + attributes.id)
          .then((res) => res.data),
    })
  
    if (isLoading) return (
      <div>Loading...</div>
    );
    if (error) return (
      <div>
        An error has occurred: {JSON.stringify(error)}
      </div>
    );

    //Set the bookmarks locally.
    console.log(data);
    localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks));
  
    return (
      <div>{data.name} ({data.uuid})</div>
    )
}