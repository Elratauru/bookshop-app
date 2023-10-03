'use client';

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

const API_URL = 'http://localhost:4000/users'

export default function CreateUser(): React.JSX.Element {
    const [name, setName] = useState('');

    const router = useRouter();

    // Small check to confirm that you are not logged.
    useEffect(() => {
        if(localStorage.getItem('user_id') !== null){
            router.push("/");
        }
    }, []);
    
    async function handleSubmission(e){
        e.preventDefault();

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({name}),
            headers: {"Content-Type": "application/json"}
          })

        const jsonResponse = await response.json();

        //Set local storage to contain the processed values.
        localStorage.setItem('user_id', jsonResponse.uuid);
        localStorage.setItem('user_name', name);

        // Reload components.
        location.reload();
    }

    return (
        <main>
            <h1>Create User</h1>
            <p>This page lets you quickly create a new user. The ID will be stored locally so you can use this user to bookmark any books.</p>
            <form className={styles.formUser} onSubmit={handleSubmission}>
                <input type="text" name="name" placeholder="Name" onChange={(e) => { setName(e.target.value) } } />
                <Button variant="contained" color="success" type="submit">Create User</Button>
            </form>
        </main>
    )
}
