import Discovery from "components/Discovery";
import GlyphDetailPage from "components/GlyphDetailPage";
import { LandingPage } from "components/LandingPage";
import UserHomepage from "components/UserHomepage";
import Wallet from "components/Wallet";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route path="/txn/:id" element={<GlyphDetailPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/maps/:address" element={<UserHomepage />} />
      <Route path="/maps" element={<UserHomepage />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/wallet" element={<Wallet />} />
    </Route>
  )
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route
//         path="/"
//         lazy={() => import("../components/LandingPage")}
//       />
//       <Route path="/txn/:id" lazy={() => import("../components/GlyphDetailPage")}
//       />
//       <Route path="/landing" element={<LandingPage />} />
//       <Route path="/maps" element={<UserHomepage />} />
//       <Route path="/discovery" element={<Discovery />} />
//       <Route path="/wallet" element={<Wallet />} />
//     </Route>
//   )
// );

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LandingPage />,
//     children: [
//       {
//         path: 'txn/:id',
//         element: <GlyphDetailPage />
//       },
//       {
//         path: 'landing',
//         element: <LandingPage />
//       },
//       {
//         path: 'maps',
//         element: <UserHomepage />
//       },
//       {
//         path: 'discovery',
//         element: <Discovery />
//       },
//       {
//         path: 'wallet',
//         element: <Wallet />
//       },
//     ]
//   }
// ])

export default router;