import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { useState, useEffect } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import MonthReportApi from "../../services/reportMonth";

function createData(name, type, rating, reads, pageCount, uploadDate, comments, averageCost, totalCost) {
    return { name, type, rating, reads, pageCount, uploadDate, comments, averageCost, totalCost };
}

function ReportMonth({ setReportName, correctMonthId, setHeaderReport, headerReport, year }) {
    const [oyKitoblari, setOyKitoblari] = useState([]);
    const [toliqMalumot, settoliqmalumot] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await MonthReportApi.getMonthReport({ year: year, monthId: correctMonthId });
                settoliqmalumot(response);
                setOyKitoblari(response.books);
                setHeaderReport({
                    totalYearCost: response['month-stats']?.totalSum,
                    totalPaidSum: response['month-stats']?.totalPaidSum,
                    totalRemainedSum: response['month-stats']?.totalRemainedSum,
                    totalBookYearCount: response['month-stats']?.totalBookCount,
                    totalYearReadCount: response['month-stats']?.totalReadCount
                });                
            } catch (error) {
                console.error("Hisobot yuklashda xatolik:", error);
            }
        };
        fetchReport();
    }, [correctMonthId]);
    
    // useEffect(() => {
    //     
    // }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const rows = oyKitoblari.map((book) => 
        createData(
            book.name, 
            book.type, 
            book.rating, 
            book.readCount, 
            book.pageCount, 
            book.uploadDate,
            book.comments ? book.comments : 0,
            book.averageCost,
            book.totalCost
        )
    );

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Button 
                variant="contained" 
                sx={{ position: 'absolute', top: '-190px', left: '960px', background: '#00A3FF', width: '180px', height: '45px', p: '10px', borderRadius: '17px' }} 
                onClick={() => setReportName("")}
            >
                <ArrowBackIcon />Ortga qaytish
            </Button>
            <Box sx={{ color: 'white', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
                <TableContainer 
                    component={Paper} 
                    sx={{ height: '100%', overflow: 'auto', width: '100%', flex: '1 1 auto' }}
                >
                    <Table sx={{ minWidth: 650, background: 'white' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'black', paddingLeft: '20px', fontSize: '17px', fontWeight: '700' }} align="left">Kitob nomi</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }} align="center">Kitob turi</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }} align="center">O'rtacha to'lov</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }} align="center">O‘qishlar soni</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }} align="center">Umumiy summa</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '17px', fontWeight: '700' }} align="center">Yuklangan sana</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '39px' }}
                                >
                                    <TableCell align="left" sx={{ color: 'black', py: '4px', px: '8px', pl: '20px' }}>{row.name}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black', py: '4px', px: '8px' }}>{row.type}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black', py: '4px', px: '8px' }}>{row.averageCost}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black', py: '4px', px: '8px' }}>{row.reads}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black', py: '4px', px: '8px' }}>{row.totalCost}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black', py: '4px', px: '8px' }}>{row.uploadDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: 'white', position: 'sticky', width: '100%' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '17px', color: '#002883' }}>
                        Jami
                        <Box component="span" sx={{ ml: 85 }}>{toliqMalumot['month-stats']?.totalSum || "0 so'm"}</Box>
                    </Typography>
                    
                    <TablePagination
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        sx={{ color: 'black', whiteSpace: 'nowrap'}}
                        rowsPerPageOptions={[]} 
                        labelDisplayedRows={() => toliqMalumot.month || "nomalum"}
                    />
                </Box>
            </Box>
        </>
    );
}

export default ReportMonth;
