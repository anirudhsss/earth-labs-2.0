import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { UserHomepage } from "components/UserHomepage";
import { Wallet } from "components/Wallet";
import { Discovery } from "components/Discovery";
import App from "App";
import { LandingPage } from "components/LandingPage";

// declare function createRoutesFromElements(
//     children: React.ReactNode
// ): RouteObject[];

// interface RouteObject {
//     caseSensitive?: boolean;
//     children?: RouteObject[];
//     element?: React.ReactNode;
//     index?: boolean;
//     path?: string;
// }

// const UserHomepage = () => <div>Maps</div>

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={
                <Navigate to="/maps" replace
                    state={{
                        icon: 'maps',
                    }}
                />}
            />
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/maps" element={<UserHomepage />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/wallet" element={<Wallet />} />
        </Route>
    )
)
