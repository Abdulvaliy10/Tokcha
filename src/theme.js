import { createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#417bfe", 
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});


export default theme;