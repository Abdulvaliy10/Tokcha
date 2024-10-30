import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/'); // Bosh sahifaga o'tish
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to right bottom, #012984, #2057d5)',
                textAlign: 'center',
                color: '#fff',
                padding: 2,
            }}
        >
            <Box sx={{      
                            mt: '-100px',
                            transform: 'rotate(90deg)',
                            borderRadius: '60px',
                            background: 'linear-gradient(to right top, #215FEA, #002883)',
                            width: '300px',
                            height: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src="/src/imgs/Tokcha logo.png" alt="" style={{ transform: 'rotate(95deg)', width: '200px', height: '200px', objectFit: 'contain'  }} />
                        </Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '60px', md: '100px' }, fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Sahifa topilmadi
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
                Ushbu sahifa mavjud emas yoki ko'rsatilmayapti.
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleHomeRedirect} 
                sx={{ borderRadius: '20px' }}
            >
                Bosh sahifaga o'tish
            </Button>
        </Box>
    );
}

export default NotFound;
