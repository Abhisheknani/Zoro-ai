import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Fira Sans", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "none",
          border:"none",
          fontSize: "1rem",
          backgroundColor: "#ed6c02",
          color: "#fff",
          height: "2.3rem",
          minWidth: "6rem",
          "&:hover": {
            backgroundColor: "#e65100", // darker orange hover
          },
        },
      },
    },
  },
});

export default theme;
