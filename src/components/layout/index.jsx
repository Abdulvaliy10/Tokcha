import NavBar from '../navBar/index';
import BoshSahifa from '../../pages/boshSahifa/index';
import Hisobot from '../../pages/hisobot/index';
import { Box, Grid2 } from '@mui/material';

function Layout({ user, setUser, chosePage, setChosePage, headerReport, setHeaderReport }) {
    return (
        <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
            <Grid2 container sx={{ height: '100vh' }}>
                <Grid2 sx={{ height: '100%', width: '22vw' }}>
                    <NavBar setUser={setUser} user={user} setChosePage={setChosePage}/>
                </Grid2>
                <Grid2 sx={{ height: '100%', width: '78vw', display: 'flex', background: '#CCE5FF'}}>
                    {chosePage ? 
                    <BoshSahifa 
                    user={user} 
                    setHeaderReport={setHeaderReport}
                    headerReport={headerReport}
                    /> : 
                    <Hisobot
                    user={user}  
                    setHeaderReport={setHeaderReport}
                    headerReport={headerReport}
                    />}
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Layout;
