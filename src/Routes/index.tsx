import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { UserHomepage } from "components/UserHomepage";
import { Wallet } from "components/Wallet";
import { Discovery } from "components/Discovery";
import App from "App";

interface routerProps {
    children: React.ReactNode;
}

const R = () => {
    return (
        <div></div>
    )
}

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
            <Route path="/maps" element={<UserHomepage />}>
                {/* <Route path="/wallet" element={<Wallet />} /> */}
            </Route>
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/wallet" element={<Wallet />} />
        </Route>
    )
)
