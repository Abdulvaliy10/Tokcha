import { Box, Grid2, Typography, Button } from "@mui/material"; 
import Header from "../../components/header/index";
import * as React from 'react';
import { useEffect, useState } from "react";
import ReportMonth from "../oylikHisobotlar/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reportApi from "../../services/report";

function MonthCard({ month, season, data, setReportName }) {
    const hasData = data?.hasData;
    const totalCost = hasData ? Number(data.totalCost.replace(/\s+/g, '').replace("so'm", '').slice(0, -3)) : 0;
    const readCount = hasData ? data.readCount : 0;

    return (
        <Grid2 size={2} sx={{ position: 'relative', cursor: 'pointer', ml: '-10px' }} onClick={() => {
            hasData ? setReportName(month) : toast.error("Kechirasiz, lekin bu oyda sizda o‘qilagan kitoblar afsuski yo‘q ");
        }}>
            <img src={hasData ? `/src/imgs/${season}Card.png` : "/src/imgs/disabledCard.png"} alt="" style={{ 
                height: '180px', 
                width: '150px',  
                borderRadius: '10px', 
                objectFit: 'cover' 
            }} />
            <Typography sx={{ color: hasData ? 'white' : '#a0a0a0', position: 'absolute', top: '1.5%', left: '30%', transform: 'translateX(-50%)', fontWeight: 'bold', fontSize: '23px' }}>
                {month}
            </Typography>
            <Typography sx={{ color: '#a0a0a0', position: 'absolute', top: '25%', left: '40%', transform: 'translateX(-50%)', fontWeight: 'bold', fontSize: '13px' }}>
                {hasData ? (
                    <>
                        <Typography sx={{ color: '#ffffff', position: 'relative', top: '26%', left: '44%', transform: 'translateX(-50%)', fontWeight: '700' }}>
                            <span style={{ fontSize: '11px' }}>Umumiy summa:</span> 
                            <br />
                            <span style={{ fontSize: '24px' }}>{totalCost}</span> 
                            <span style={{ position: 'absolute', paddingLeft: '5%', paddingTop: '5%', fontSize: '12px', maxWidth: '20px' }}>000 so'm</span>
                        </Typography>
                        <Typography sx={{ color: '#ffffff', position: 'absolute', top: '105%', left: '35%', transform: 'translateX(-50%)', fontWeight: '700' }}>
                            <span style={{ fontSize: '11px', whiteSpace: "noWrap" }}>O'qishlar soni:</span> <br /><span style={{ fontSize: '24px' }}>{readCount}</span> <span style={{ position: 'absolute', paddingLeft: '5%', paddingTop: '20%', fontSize: '12px' }}>ta</span>
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ mt: '30%', color: '#a0a0a0', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>
                        Bu oyda sizda o‘qilagan kitoblar yo‘q
                    </Typography>
                )}
            </Typography>
        </Grid2>
    );
}

function Hisobot({ user, setHeaderReport, headerReport }) {
    const [reportName, setReportName] = useState("");
    const [malumot, setMalumot] = useState({ results: {} });
    const [year, setYear] = useState(2024); // Hozirgi yil
    const [initialHeaderReport, setInitialHeaderReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await reportApi.getReport({ year: year });
                setMalumot(response);

                const reportData = {
                    totalYearCost: response.results["annual-stats"]?.totalYearCost,
                    totalPaidSum: response.results["annual-stats"]?.totalPaidSum,
                    totalRemainedSum: response.results["annual-stats"]?.totalRemainedSum,
                    totalBookYearCount: response.results["annual-stats"]?.totalBookYearCount,
                    totalYearReadCount: response.results["annual-stats"]?.totalYearReadCount,
                };

                if (!initialHeaderReport) {
                    setInitialHeaderReport(reportData);
                }

                setHeaderReport(reportData);
            } catch (error) {
                console.error("Hisobot yuklashda xatolik:", error);
            }
        };
        fetchReport();
    }, [year]);

    const handleBackToMainReport = () => {
        setReportName("");
        if (initialHeaderReport) {
            setHeaderReport(initialHeaderReport);
        }
    };

    const handlePrev = () => {
        if (malumot.availableYears && year > Math.min(...malumot.availableYears)) {
            setYear((prevYear) => prevYear - 1);
        }
    };

    const handleNext = () => {
        if (malumot.availableYears && year < Math.max(...malumot.availableYears)) {
            setYear((prevYear) => prevYear + 1);
        }
    };

    const renderReportComponent = () => {
        switch (reportName) {
            case "Yanvar":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={1} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Fevral":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={2} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Mart":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={3} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Aprel":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={4} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "May":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={5} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Iyun":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={6} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Iyul":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={7} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Avgust":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={8} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Sentabr":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={9} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Oktabr":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={10} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Noyabr":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={11} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            case "Dekabr":
                return <ReportMonth setReportName={handleBackToMainReport} correctMonthId={12} setHeaderReport={setHeaderReport} headerReport={headerReport} year={year} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Header 
                user={user}
                headerReport={headerReport}
                setHeaderReport={setHeaderReport}
            />
            <Box sx={{ height: '67vh', width: '74vw', position: 'absolute', background: '#ffffff', top: '28.5%', left: '24%', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                <ToastContainer />
                {renderReportComponent()}

                {reportName === "" && (
                    <>
                        <Typography sx={{ color: '#202530', fontSize: '20px', fontWeight: '700', mt: '2%', ml: '4.3%' }}>Yillik hisobot</Typography>
                        <Typography sx={{ color: '#202530', fontSize: '12px', fontWeight: '400', ml: '4.3%' }}>Oylik statistikalarni olish uchun kerakli oyni tanlang</Typography>
                        <Grid2 container spacing={1} sx={{ height: '25vh', ml: '2.5%', mt: '1.5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <MonthCard month="Yanvar" season="winter" data={malumot.results.Yanvar || {}} setReportName={setReportName} />
                            <MonthCard month="Fevral" season="winter" data={malumot.results.Fevral || {}} setReportName={setReportName} />
                            <MonthCard month="Mart" season="spring" data={malumot.results.Mart || {}} setReportName={setReportName} />
                            <MonthCard month="Aprel" season="spring" data={malumot.results.Aprel || {}} setReportName={setReportName} />
                            <MonthCard month="May" season="spring" data={malumot.results.May || {}} setReportName={setReportName} />
                            <MonthCard month="Iyun" season="summer" data={malumot.results.Iyun || {}} setReportName={setReportName} />
                            <MonthCard month="Iyul" season="summer" data={malumot.results.Iyul || {}} setReportName={setReportName} />
                            <MonthCard month="Avgust" season="summer" data={malumot.results.Avgust || {}} setReportName={setReportName} />
                            <MonthCard month="Sentabr" season="autumn" data={malumot.results.Sentabr || {}} setReportName={setReportName} />
                            <MonthCard month="Oktabr" season="autumn" data={malumot.results.Oktabr || {}} setReportName={setReportName} />
                            <MonthCard month="Noyabr" season="autumn" data={malumot.results.Noyabr || {}} setReportName={setReportName} />
                            <MonthCard month="Dekabr" season="winter" data={malumot.results.Dekabr || {}} setReportName={setReportName} />
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: '76%' }}>
                                <Button onClick={handlePrev} >
                                    &lt;
                                </Button>
                                    <span style={{ margin: '0 10px', color: 'black', background: '#F3F3F4', borderRadius: '15px', paddingLeft: '6px', paddingRight: '6px', fontSize: '18px', fontWeight: '100' }}>{year}</span>
                                <Button onClick={handleNext} >
                                    &gt;
                                </Button>
                            </Box>
                        </Grid2>
                    </>
                )}
            </Box>
        </>
    );
}

export default Hisobot;
