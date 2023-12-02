import { createTheme, colors } from "@mui/material";

export let theme = createTheme({
  palette: {
    primary: {
      main: colors.orange[500],
    },
    secondary: {
      main: colors.common.white,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },

      },
    },
  }
})

theme = createTheme(theme, {
  typography: {
    fontFamily: ["Fauna One", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontSize: 48,
      [theme.breakpoints.down("lg")]: {
        fontSize: 40,
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: 34,
      }
    },
    h2: {
      fontSize: 32,
      [theme.breakpoints.down("lg")]: {
        fontSize: 28,
      },
      [theme.breakpoints.only("xs")]: {
        fontSize: 20,
      }
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 16,
    },
  }
})