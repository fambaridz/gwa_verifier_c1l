import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#014421",
      contrastText: "#FFF"

    },
    secondary: {
      main: "#7B1113",
    },
    success: {
      main: "#3E9647",
    },
    error: {
      main: "#D71317",
    },
    warning: {
      main: "#ECD718",
    },
    info: {
      main: "#36BBD8",
    },
    default: {
      main: "#AFAFAF",
    },
    black: {
      main: "#000000",
    },
  },
});

export default theme;
