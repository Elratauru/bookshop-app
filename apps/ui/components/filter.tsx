import styles from "../app/page.module.css";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useState } from "react";

export function Filter({handleFilter}){
    const [textInput, setTextInput] = useState('');

    function handleTextInputChange(e) {
        setTextInput(e.target.value);
    };

    function resetFilter() {
        setTextInput('');
        handleFilter(textInput);
    };

    return (
        <form className={styles.formFilter} onSubmit={(e) => handleFilter(textInput)}>
            <TextField label="Name or Author" value={textInput} variant="standard" onChange={handleTextInputChange} />
            <Button className={styles.filterButton} variant="outlined" onClick={(event) => handleFilter(textInput)}>Filter</Button>
            <Button variant="outlined" onClick={(event) => resetFilter()}>Reset</Button>
        </form>
    );
}