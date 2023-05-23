import { Discovery } from "components/Discovery";
import GlyphDetailPage from "components/GlyphDetailPage";
import { LandingPage } from "components/LandingPage";
import { UserHomepage } from "components/UserHomepage";
import { Wallet } from "components/Wallet";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

export interface RouterProps {
  caseSensitive?: boolean;
  children?: RouterProps[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route path="/txn/:id" element={<GlyphDetailPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/maps" element={<UserHomepage />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/wallet" element={<Wallet />} />
    </Route>
  )
);
