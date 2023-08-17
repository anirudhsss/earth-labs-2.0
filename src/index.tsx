import { Box } from "@mui/material";
import SnackBarProvider from "provider/snackbar.provider";
import TwitterProvider from "provider/twitter.provider";
import Web3ModalProvider from "provider/web3modal.provider";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes";
import ReactGA from 'react-ga';


ReactGA.initialize('G-MC3TET664D');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


ReactGA.pageview(window.location.pathname + window.location.search);


root.render(
  <Box sx={{ display: { xs: "none", md: "block" } }}>
    <SnackBarProvider>
      <Web3ModalProvider>
        <TwitterProvider>
          <RouterProvider router={router} />
        </TwitterProvider>
      </Web3ModalProvider>
    </SnackBarProvider>
  </Box>
);
