import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate 
import authApi from "../../services/auth";



function LogIn({ setUser,user }) {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const addUser = async () => {

        if (login.trim() && password.trim()) {
            const { error } = await authApi.login(login, password)
            setUser(login)
            window.location.pathname = "/home"
            if (error) {
                toast.error("Hato")
            } else {
                setLogin('');
                setPassword('');
                toast.success("Siz muvaffaqiyatli ro'yhatdan o'tdingiz");
                navigate('/home');
            }
            //     const newUser = { login, password }; 
            //     setUser(newUser); 
            //     setLogin('');  
            //     setPassword('');  
            //     toast.success("Siz muvaffaqiyatli ro'yhatdan o'tdingiz"); 
            //     navigate('/ui/home');  
            // } else { 
            //     toast.error("Kechirasiz lekin siz Login yoki Parolni kiritmadingiz!"); 
        }
    };

    // Enter tugmasi bosilganda funktsiyani bajarish 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (document.activeElement === document.getElementById('loginField')) {
                document.getElementById('passwordField').focus(); // Parolga o'tish 
            } else if (document.activeElement === document.getElementById('passwordField')) {
                addUser(); // Tasdiqlash tugmasi funksiyasini chaqirish 
            }
        }
    };

    return ( 
            <Box sx={{ height: '100vh', width: '100vw', background: 'linear-gradient(to right bottom, #012984, #2057d5)', overflow: 'hidden', position: 'relative' }}>
                <Box sx={{
                    borderRadius: '5px',
                    background: 'linear-gradient(to right bottom, #215FEA, #002883)',
                    width: '55px',
                    height: '55px',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ml: '6%',
                    mt: '2.5%'
                }}>
                    <img src="/src/imgs/Tokcha logo.png" style={{ width: '40px', height: '30px', position: 'absolute', objectFit: 'contain', transform: 'rotate(4deg)' }} alt="" />
                    <h1 style={{ marginLeft: '300px', fontSize: '50px' }}>TOKCHA</h1>
                </Box>
                <Box sx={{ mt: '14%', ml: '6%' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '40px', mb: '5px' }}>
                        Kirish
                    </Typography>
                    <Typography sx={{ maxWidth: '300px', fontWeight: 'thin', mb: '30px' }}>
                        Akkauntga kirish uchun login va parolingizni kiriting
                    </Typography>
                    <Typography sx={{ fontWeight: 'thin', mb: '5px' }}>Login</Typography>
                    <TextField
                        id="loginField" // ID qo'shiladi 
                        sx={{ background: '#F3F3F4', borderRadius: '15px', width: '380px', mb: '20px', border: 'none' }}
                        required
                        placeholder={"Login Example"}
                        InputProps={{
                            sx: { borderRadius: '15px', color: 'gray' },
                        }}
                        value={login} onChange={(e) => setLogin(e.target.value)}
                        onKeyDown={handleKeyDown} // onKeyDown hodisasi 
                    />

                    <Typography sx={{ fontWeight: 'thin', mb: '5px' }}>Parolni kiriting</Typography>
                    <TextField
                        id="passwordField" // ID qo'shiladi 
                        sx={{ background: '#F3F3F4', borderRadius: '15px', width: '380px', position: 'absolute', border: 'none' }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={"Parol"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                color: 'gray',
                                borderRadius: '15px'
                            }
                        }}
                        onKeyDown={handleKeyDown} // onKeyDown hodisasi 
                    />
                    <Button
                        sx={{ mt: '100px', background: '#407BFF', width: '380px', height: '50px', borderRadius: '15px' }}
                        variant="contained"
                        onClick={addUser}
                    >
                        Tasdiqlash
                    </Button>
                    <ToastContainer />
                </Box>
                <Box sx={{
                    transform: 'rotate(58deg)',
                    top: '15%',
                    left: '60%',
                    position: 'absolute',
                    background: '#407bfe',
                    height: '700px',
                    width: '700px',
                    borderRadius: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                        transform: 'rotate(10deg)',
                        position: 'absolute',
                        background: '#407bfe',
                        height: '550px',
                        width: '550px',
                        borderRadius: '150px',
                        boxShadow: '0 0 80px 1px #00000033',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            transform: 'rotate(15deg)',
                            borderRadius: '100px',
                            background: 'linear-gradient(to right top, #215FEA, #002883)',
                            width: '400px',
                            height: '400px',
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src="/src/imgs/Tokcha logo.png" alt="" style={{ transform: 'rotate(100deg)' }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
    );
}

export default LogIn;