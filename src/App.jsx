import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
