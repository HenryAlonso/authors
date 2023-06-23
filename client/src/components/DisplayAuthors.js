import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const DisplayAuthors = () => {

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/author")
            .then(response => {
                const sortedAuthors = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                console.log(response)
                setAuthors(sortedAuthors)
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    const removeFromDom = authorId => {
        axios.delete(`http://localhost:8000/api/author/${authorId}`)
            .then(response => {
                console.log(response)
                setAuthors(authors.filter(authors => authors._id !== authorId));
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        <div className={styles.content}>

            <Link to={`/author/new`}>Add an Author</Link>
            <p className={styles.purple}>We have quotes by: </p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Author</TableCell>
                            <TableCell>Actions Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author, index) => {
                            return (
                                <TableRow
                                    key={author._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {author.name}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`author/edit/${author._id}`} >
                                            <Button variant="contained" size="small" type='submit'>
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button variant="contained" size="small" type='submit' onClick={() => removeFromDom(author._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default DisplayAuthors;

