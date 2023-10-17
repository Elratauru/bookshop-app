import styles from "../app/page.module.css";
import Button from '@mui/material/Button';

import {useState} from 'react';

const API_URL = 'http://localhost:4000/users';

const TEXT_BUTTONS = {
    add: 'Add to Bookmarks',
    remove: 'Remove from Bookmarks',
    saving: 'Saving...',
}

const TEXT_STYLES = {
    add: 'success' as "success",
    remove: 'error' as "error",
    saving: 'warning' as "warning",
}

export function Book(bookObject){
    let displayButton = false;
    const book = bookObject.object;
    const userId: string | null = localStorage.getItem('user_id');

    // For each book, we wanna check if it's stored on the user information or not to know the state of the button.
    const localBookmarks = localStorage.getItem('bookmarks');
    const bookmarks = (localBookmarks) ? JSON.parse(localBookmarks) : [];
    const bookmarksFilter = bookmarks.filter((bookmark) => bookmark.id === book.id);
    const inBookmarks: boolean = (bookmarksFilter.length > 0);
    
    // Setting the initial state.
    const [buttonStyle, setStyle] = useState<"success" | "error" | "warning">(inBookmarks ? TEXT_STYLES.remove : TEXT_STYLES.add);
    const [buttonState, setButton] = useState<string>(inBookmarks ? 'remove' : 'add');
    const [buttonText, setText] = useState<string>(inBookmarks ? TEXT_BUTTONS.remove : TEXT_BUTTONS.add);

     // Checking if we need to display the buttons or not.
    if(userId !== null) displayButton = true;

    async function addOrRemoveBookmarks(bookId: number){
        const localBookmarks = localStorage.getItem('bookmarks');
        const bookmarks = (localBookmarks) ? JSON.parse(localBookmarks) : [];

        // We have an intermediary state for saving status.
        changeButtonState('saving');

        if(buttonState === 'add'){
            await fetch(API_URL + '/' + userId + '/bookmarks', {
                method: 'POST',
                body: JSON.stringify({id: bookId}),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                // Set the state as well
                bookmarks.push({id: bookId})
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                changeButtonState('remove');
            });
        } else if (buttonState === 'remove'){
            await fetch(API_URL + '/' + userId + '/bookmarks/' + bookId, {
                method: 'DELETE'
            }).then(() => {
                const index = bookmarks.findIndex((book) => book.id === bookId);
                if(index !== -1) bookmarks.splice(index, 1);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                changeButtonState('add');
            })
        }
    }

    function changeButtonState(key = 'add'){
        if(key === 'add'){
            setStyle(TEXT_STYLES.add);
            setButton('add');
            setText(TEXT_BUTTONS.add)
        } else if (key =='remove') {
            setStyle(TEXT_STYLES.remove);
            setButton('remove');
            setText(TEXT_BUTTONS.remove)
        } else if (key == 'saving'){
            setStyle(TEXT_STYLES.saving)
            setButton('saving');
            setText(TEXT_BUTTONS.saving);
        }
    }

    return (
        <div className={styles.book} id={book.id}>
            <div className={styles.imageContainer}><img src={book.formats["image/jpeg"]} /></div>
            <div className={styles.title}>{book.title}</div>
            <div>{book.authors.map((author) => (author.name)).join(' & ')}</div>
            {(displayButton) ? <Button color={buttonStyle} variant="contained" onClick={async () => await addOrRemoveBookmarks(book.id)}>{buttonText}</Button> : ''}
        </div>
    )
}