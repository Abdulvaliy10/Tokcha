import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import LogIn from './pages/logIn/index';
import ProtectedRoute from './assets/ProtectedRoute';
import Layout from './components/layout/index';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';
import authApi from './services/auth';
import NotFound from './pages/notFound/index'

function App() {
    const [user, setUser] = useState();
    const [headerReport, setHeaderReport] = useState([])
    const [chosePage, setChosePage] = useState(true);

    useEffect(() => {
        setUser(authApi.getCurrentUser());
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LogIn user={user} setUser={setUser} />} />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Layout
                                        user={user}
                                        chosePage={chosePage}
                                        setChosePage={setChosePage}
                                        setHeaderReport={setHeaderReport}
                                        headerReport={headerReport}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/report"
                            element={
                                <Layout
                                    user={user}
                                    setUser={setUser}
                                    chosePage={chosePage}
                                    setChosePage={setChosePage}
                                    setHeaderReport={setHeaderReport}
                                    headerReport={headerReport}
                                />
                            }
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
