import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import styles from '../styles.module.css'

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';

const AuthorForm = () => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/author", { name })
            .then(response => {
                console.log(response);
                navigate("/");
            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };

    const handleNameChange = e => {
        setName(e.target.value);
    };

    return (
        <div className={styles.content}>
                <div>
                    
                    <Link to={"/"}>Home</Link>
                    <p className={styles.purple}>Add a new author: </p>
                </div>
            <Paper className={styles.form} elevation={2}>
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            id="outlined-helperText"
                            label="Name"
                            placeholder="David Dalglish"
                            onChange={handleNameChange}
                        />
                        {errors.name ? <p>{errors.name.message}</p> : null}
                        <div className={styles.button}>
                            <Link to={"/"}>
                                <Button variant='contained' size='small'>Cancel</Button>
                            </Link>
                            <Button className={styles.left} variant="contained" size="small" type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    )

}
export default AuthorForm;
