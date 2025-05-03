import { Routes as RoutesRR, Route } from "react-router";
import HomePage from "../pages/HomePage";
import AnimePage from "../pages/AnimePage";

const Routes = () => {
    return (
        <RoutesRR>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/anime" element={<AnimePage />}></Route>
        </RoutesRR>
    )
}

export default Routes