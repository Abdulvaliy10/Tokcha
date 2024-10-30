import { Box } from "@mui/material";
import HeaderUI from "../../components/header/index";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import booksApi from "../../services/books";
import { useState, useEffect } from "react";

function createData(name, type, rating, reads, pageCount, uploadDate, comments) {
    return { name, type, rating, reads, pageCount, uploadDate, comments };
}

function BoshSahifa({ user, headerReport, setHeaderReport }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [booksData, setBooksData] = useState([]);
    const [totalBooksCount, setTotalBooksCount] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await booksApi.getBooks();
                setBooksData(response.data);
                setTotalBooksCount(response.data.length);
                setHeaderReport({
                    totalYearCost: response.overallStats.totalCost,
                    totalPaidSum: response.overallStats.totalPaidSum,
                    totalRemainedSum: response.overallStats.totalRemainedSum,
                    totalBookYearCount: response.overallStats.totalBookCount,
                    totalYearReadCount: response.overallStats.totalReadCount
                });
            } catch (error) {
                console.error("Kitoblarni yuklashda xatolik:", error);
            }
        };
        fetchBooks();
    }, [page, rowsPerPage]);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const rows = booksData.map((book) => 
        createData(
            book.name, 
            book.type, 
            book.rating, 
            book.readCount, 
            book.pageCount, 
            book.uploadDate, 
            book.comments ? book.comments : 0
        )
    );

    const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
    return (
        <>
            <HeaderUI 
            user={user}
            headerReport={headerReport}
            />
            <Box
                sx={{
                    height: '67vh',
                    width: '74vw',
                    position: 'absolute',
                    background: '#ffffff',
                    top: '28.5%',
                    left: '24%',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                }}
            >
                <TableContainer
                    component={Paper}
                    sx={{
                        height: '100%',
                        overflow: 'hidden',
                        width: '100%'
                    }}
                >
                    <Table sx={{ minWidth: 650, background: 'white' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'black', paddingLeft: '20px', fontSize: '20px', fontWeight: '700' }} align="left">Kitob nomi</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '18px', fontWeight: '700' }} align="center">Kitob turi</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '18px', fontWeight: '700' }} align="center">Kitob reytingi</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '18px', fontWeight: '700' }} align="center">O‘qishlar soni</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '18px', fontWeight: '700' }} align="center">Sharhlar soni</TableCell>
                                <TableCell sx={{ color: 'black', fontSize: '18px', fontWeight: '700' }} align="center">Yuklangan sana</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" sx={{ color: 'black' }}>{row.name}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>{row.type}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>
                                        <span style={{ background: '#FFBC0F', padding: '3px 8px', borderRadius: '15px', color: 'white' }}>{row.rating}</span>
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>{row.reads}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>{row.comments}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>{row.uploadDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    count={totalBooksCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ color: 'black' }}
                    rowsPerPageOptions={[5, 10]} // You can allow for both 5 and 10 rows per page
                />
            </Box>
        </>
    );
}

export default BoshSahifa;
