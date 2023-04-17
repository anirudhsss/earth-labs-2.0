import ReactDOM from "react-dom/client";
import { Box } from "@mui/material";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Box sx={{ display: { xs: "none", md: "block" } }}>
    <RouterProvider router={router} />
  </Box>
);
