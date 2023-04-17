import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { UserHomepage } from "components/UserHomepage";
import { Wallet } from "components/Wallet";
import { Discovery } from "components/Discovery";
import { LandingPage } from "components/LandingPage";
import GlyphDetail from "components/shared/GlyphDetail";
import GlyphDetailPage from "components/GlyphDetailPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <Navigate
            to="/maps"
            replace
            state={{
              icon: "maps",
            }}
          />
        }
      />
      <Route path="/txn/:id" element={<GlyphDetailPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/maps" element={<UserHomepage />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/wallet" element={<Wallet />} />
    </Route>
  )
);
