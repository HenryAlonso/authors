import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom';
import styles from '../styles.module.css'

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';


const EditAuthor = (props) => {
    const {id} = useParams();
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/author/${id}`)
            .then(response => {
                console.log(response)
                setAuthorName(response.data.name);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/author/${id}`, {name: authorName})
            .then(response => {
                console.log(response)
                navigate("/")
            })
            .catch(err => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };
    const handleNameChange = e => {
        setAuthorName(e.target.value);
    };

    return(
        <div className={styles.content}>
                <div>
                    
                    <Link to={"/"}>Home</Link>
                    <p className={styles.purple}>Edit this author: </p>
                </div>
            <Paper className={styles.form} elevation={2}>
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            id="outlined-helperText"
                            label="Name"
                            value={authorName}
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
};

export default EditAuthor;