import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, multiply, divide, setNote } from '../../../store/features/counterSlice';

import {
    Card,
    CardContent,
    Button,
    Typography,
    Box, Stack
} from '@mui/material';

const Counters = () => {

    const count = useSelector((state) => state.counter.value);

    const dispatch = useDispatch();

    const handleMultiply = () => {
        if (count === 0) {
            alert("0 can't be multiplied");
        } else {
            dispatch(multiply(2));
        }
    };

    const handleDivide = () => {
        if (count === 0) {
            alert("0 can't be divided");
        } else {
            dispatch(divide(2));
        }
    };

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
                        <Typography
                            variant="h5"
                            component="div"
                            gutterBottom
                            sx={{ fontWeight: 'bold', color: '#1565C0' }}
                        >
                            Counter: {count}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            sx={{ marginBottom: 2 }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => dispatch(increment())}
                                sx={{ bgcolor: '#1E88E5', '&:hover': { bgcolor: '#1565C0' }, width: 60, height: 40, fontSize: `22px` }}
                            >
                                +
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(decrement())}
                                sx={{ bgcolor: '#e53935', '&:hover': { bgcolor: '#b71c1c' }, width: 60, height: 40, fontSize: `22px` }}
                            >
                                -
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => dispatch(incrementByAmount(5))}
                                sx={{ bgcolor: '#6A1B9A', '&:hover': { bgcolor: '#4A148C' }, width: 60, height: 40, fontSize: `22px` }}
                            >
                                5+
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleMultiply}
                                sx={{ bgcolor: '#43A047', '&:hover': { bgcolor: '#2E7D32' }, width: 60, height: 40, fontSize: `22px` }}
                            >
                                *
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleDivide}
                                sx={{ bgcolor: '#FB8C00', '&:hover': { bgcolor: '#EF6C00' }, width: 60, height: 40, fontSize: `22px` }}
                            >
                                /
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default Counters;