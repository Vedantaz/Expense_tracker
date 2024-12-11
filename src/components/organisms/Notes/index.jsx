import { setNote } from '../../../store/features/counterSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, Typography, CardContent, CardActions, Box, Card } from '@mui/material';

const Notes = () => {
    const note = useSelector((state) => state.counter.note)
    const dispatch = useDispatch();

    const [noteInput, setNoteInput] = useState('');

    const handleNote = () => {
        dispatch(setNote(noteInput));
    }
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: '#f0f4f8',
                    padding: 2,
                }}
            >
                <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
                    <CardContent>

                        <TextField
                            label="Edit your note"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />

                        <Typography
                            variant="body1"
                            sx={{ color: '#424242', marginBottom: 2 }}
                        >
                            Current Note:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ bgcolor: '#e3f2fd', padding: 1, borderRadius: 1 }}
                        >
                            {note || 'No note saved yet!'}
                        </Typography>
                    </CardContent>


                    <CardActions>
                        <Button
                            variant="contained"
                            onClick={handleNote}
                            sx={{
                                margin: 'auto',
                                bgcolor: '#1E88E5',
                                '&:hover': { bgcolor: '#1565C0' },
                            }}
                        >
                            Save
                        </Button>
                    </CardActions>

                </Card>

            </Box>



        </>
    )

}

export default Notes;