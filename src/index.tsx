import { Box } from "@mui/material";
import TwitterProvider from "provider/twitter.provider";
import Web3ModalProvider from "provider/web3modal.provider";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Box sx={{ display: { xs: "none", md: "block" } }}>
    <Web3ModalProvider>
      <TwitterProvider>
        <RouterProvider router={router} />
      </TwitterProvider>
    </Web3ModalProvider>
  </Box>
);
