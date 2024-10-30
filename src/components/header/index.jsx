import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';

function Header({ user, headerReport }) {
    // totalYearCost ni o'zgarmas qiymat sifatida formatlash
    const totalYearCost = headerReport?.totalYearCost 
        ? Number(headerReport.totalYearCost.replace(/\s+/g, '').replace("so'm", '').slice(0, -3))
        : 0;
    // totalPaidSum
    const totalPaidSum = headerReport?.totalPaidSum 
    ?  Number( headerReport.totalPaidSum.replace(/\s+/g, '').replace("so'm", '').slice(0, -3)) 
    : 0;
    // totalRemainedSum
    const totalRemainedSum = headerReport?.totalRemainedSum 
    ?  Number( headerReport.totalRemainedSum.replace(/\s+/g, '').replace("so'm", '').slice(0, -3)) 
    : 0;
    // totalBookYearCount
    const totalBookYearCount = headerReport?.totalBookYearCount 
    ?  headerReport.totalBookYearCount
    : 0;
    // totalYearReadCount
    const totalYearReadCount = headerReport?.totalYearReadCount 
    ?  headerReport.totalYearReadCount
    : 0 ;
    return (
        <>
            <Box sx={{ height: '40vh', width: '100vw', mt: '-1%', mb: '-1%' }}>
                <Box sx={{ display: 'flex' }}>
                    {user && (
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                color: '#002883', 
                                fontWeight: '700', 
                                fontSize: '36px', 
                                mt: '2.5%', 
                                ml: '2.5%', 
                                position: 'absolute',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden', 
                                textOverflow: 'clip' 
                            }}
                        >
                            Salom, {user.username}👋
                        </Typography>
                    )}
                    <Typography 
                        variant="h2" 
                        sx={{ 
                            color: '#00A3FF', 
                            fontWeight: '700', 
                            fontSize: '17px', 
                            mt: '7%', 
                            ml: '3.3%',
                            maxWidth: 'auto',
                            overflow: 'hidden', 
                            textOverflow: 'clip' 
                        }}
                    >
                        Tokcha<span style={{ fontWeight: '400' }}>ngizdagi statistikalar bilan tanishing</span>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '2%', ml: '2.5%', mr: '2.5%' }}>
                    {/* Umumiy daromad */}
                    <Box sx={{ background: 'white', width: '210px', height: '90px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', width: '60px', height: '60px', background: '#E9E9EA', ml: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <AccountBalanceWalletIcon sx={{ fontSize: '35px', color: '#002883' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', ml: '5.5%', mb: '3%', fontWeight: '700', color: '#000000', position: 'absolute' }}>Umumiy daromad</Typography>
                        <Typography sx={{ fontSize: '23px', ml: '5.5%', mt: '1.3%', fontWeight: '700', color: '#00A3FF', position: 'absolute' }}>
                            {totalYearCost}<span style={{ fontSize: '11px', position: 'absolute', top: '10%', left: '105%' }}>{totalYearCost === 0 ? '' : '000'}<br /></span><span style={{ fontSize: '11px', position: 'absolute', marginTop: '15px', left: '105%'}}> so'm</span>
                        </Typography>
                    </Box>
                    {/* To'langan summa */}
                    <Box sx={{ background: 'white', width: '210px', height: '90px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', width: '60px', height: '60px', background: '#E9E9EA', ml: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <WalletIcon sx={{ fontSize: '35px', color: '#002883' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', ml: '5.5%', mb: '3%', fontWeight: '700', color: '#000000', position: 'absolute' }}>To‘langan summa</Typography>
                        <Typography sx={{ fontSize: '29px', ml: '5.5%', mt: '1.3%', fontWeight: '700', color: '#00A3FF', position: 'absolute' }}>
                        {totalPaidSum} <span style={{ fontSize: '11px', position: 'absolute', top: '18%', left: '105%' }}>{totalPaidSum === 0 ? '' : '000'}<br /></span><span style={{ fontSize: '11px', position: 'absolute', marginTop: '55%', left: '105%'}}> so'm</span>
                        </Typography>
                    </Box>
                    {/* Qoldiq summa */}
                    <Box sx={{ background: 'white', width: '210px', height: '90px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', width: '60px', height: '60px', background: '#E9E9EA', ml: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <WalletIcon sx={{ fontSize: '35px', color: '#002883' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', ml: '5.5%', mb: '3%', fontWeight: '700', color: '#000000', position: 'absolute' }}>Qoldiq summa</Typography>
                        <Typography sx={{ fontSize: '29px', ml: '5.5%', mt: '1.3%', fontWeight: '700', color: '#00A3FF', position: 'absolute' }}>
                        {totalRemainedSum} <span style={{ fontSize: '11px', position: 'absolute', top: '18%', left: '105%' }}>{totalRemainedSum === 0 ? '' : '000'}<br /></span><span style={{ fontSize: '11px', position: 'absolute', marginTop: '55%', left: '105%'}}> so'm</span>
                        </Typography>
                    </Box>
                    {/* Jami kitoblar soni */}
                    <Box sx={{ background: 'white', width: '210px', height: '90px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', width: '60px', height: '60px', background: '#E9E9EA', ml: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <WalletIcon sx={{ fontSize: '35px', color: '#002883' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', ml: '5.5%', mb: '3%', fontWeight: '700', color: '#000000', position: 'absolute' }}>Jami kitoblar soni</Typography>
                        <Typography sx={{ fontSize: '29px', ml: '5.5%', mt: '1.3%', fontWeight: '700', color: '#00A3FF', position: 'absolute' }}>{totalBookYearCount}<span style={{ fontSize: '16px' }}> ta</span></Typography>
                    </Box>
                    {/* O‘qishlar soni */}
                    <Box sx={{ background: 'white', width: '210px', height: '90px', borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ borderRadius: '50%', width: '60px', height: '60px', background: '#E9E9EA', ml: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <WalletIcon sx={{ fontSize: '35px', color: '#002883' }} />
                        </Box>
                        <Typography sx={{ fontSize: '13px', ml: '5.5%', mb: '3%', fontWeight: '700', color: '#000000', position: 'absolute' }}>O‘qishlar soni</Typography>
                        <Typography sx={{ fontSize: '26px', ml: '5.5%', mt: '1.3%', fontWeight: '700', color: '#00A3FF', position: 'absolute' }}>{totalYearReadCount}<span style={{ fontSize: '16px', top: '40%' }}> ta</span></Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Header;
