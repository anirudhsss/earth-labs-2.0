import ReactDOM from "react-dom/client";
import { Box } from "@mui/material";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Web3ModalProvider from "provider/web3modal.provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Box sx={{ display: { xs: "none", md: "block" } }}>
    <Web3ModalProvider>
      <RouterProvider router={router} />
    </Web3ModalProvider>
  </Box>
);
