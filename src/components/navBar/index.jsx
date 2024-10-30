import { Box, Button, Typography, Menu, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function NavBar({ user, setChosePage }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('home');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const LogOut = () => {
        localStorage.removeItem("token");
        window.location.pathname = "/";
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            background: 'white',
            color: 'black',
            width: '22vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #E9E9EA',
        }}>
            <Box sx={{
                borderRadius: '5px',
                background: 'linear-gradient(to right bottom, #215FEA, #002883)',
                width: '35px',
                height: '35px',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '3%',
                ml: '5vw',
            }}>
                <img 
                    src="/src/imgs/Tokcha logo.png" 
                    style={{ 
                        width: '24px', 
                        height: '17px', 
                        position: 'absolute', 
                        objectFit: 'contain', 
                        transform: 'rotate(4deg)' 
                    }} 
                    alt="Tokcha Logo" 
                />
                <h1 style={{ marginLeft: '500%', fontSize: '30px', color: '#002883', fontWeight: 'thin' }}>
                    TOKCHA
                </h1>
            </Box>
            <Box sx={{ ml: '-15%' }}>
                <Button 
                    variant={activeButton === 'home' ? 'contained' : 'outlined'} 
                    onClick={() => {
                        setActiveButton('home');
                        setChosePage(true); // Bosh sahifaga o'tish
                        navigate('/home');
                    }}
                    sx={{ 
                        mt: '20vh',
                        ml: '5vw',
                        background: activeButton === 'home' ? '#00A3FF' : 'transparent',
                        border: 'none',
                        color: activeButton === 'home' ? 'white' : 'gray',
                        boxShadow: 'none',
                        borderRadius: '12px',
                        width: '70%',
                        height: '20%'
                    }}
                >
                    <HomeIcon sx={{ mr: '10px' }} />
                    Bosh Sahifa
                </Button>
                <Button 
                    variant={activeButton === 'report' ? 'contained' : 'outlined'} 
                    onClick={() => {
                        setActiveButton('report');
                        setChosePage(false);
                        navigate('/report');
                    }}
                    sx={{ 
                        mt: '3%',
                        ml: '5vw',
                        background: activeButton === 'report' ? '#00A3FF' : 'transparent',
                        border: 'none',
                        color: activeButton === 'report' ? 'white' : 'gray',
                        boxShadow: 'none',
                        borderRadius: '12px',
                        width: '70%',
                        height: '20%'
                    }}
                >
                    <BarChartIcon sx={{ mr: '10px' }} />
                    Hisobot
                </Button>
            </Box>
            <Box sx={{
                mt: '125%',
                ml: '13%',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                <img 
                    src="/src/imgs/James Clir.png"
                    alt="User Avatar"
                    style={{ 
                        width: '60px',
                        height: '60px',
                        objectFit: 'contain',
                        borderRadius: '11px'
                    }}
                />
                <Box sx={{ ml: '15px', flexGrow: 1 }}>
                    {user && <Typography 
                        variant="h6"
                        sx={{ color: 'black', fontWeight: '700', fontSize: '20px', maxWidth: '200px' }}
                        noWrap
                    >
                        {user.username}
                    </Typography>}
                    <Typography sx={{ color: 'gray', fontWeight: '500', fontSize: '16px' }}>
                        Muallif
                    </Typography>
                </Box>
                <Button sx={{ mr: '25%', mb: '7%', color: 'gray'}} onClick={handleClick}>
                    <ExpandMoreIcon fontSize="large"/>
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={LogOut}>
                        <span style={{color: 'black', fontWeight: '500'}}>
                        Logout
                        </span>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
export default NavBar;
