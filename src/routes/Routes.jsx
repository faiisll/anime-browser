import { Routes as RoutesRR, Route, useLocation } from "react-router";
import HomePage from "../pages/HomePage";
import AnimePage from "../pages/AnimePage";
import { motion, AnimatePresence } from 'motion/react';

const AnimateWrapper = ({children}) => {
    return <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
    transition={{duration: 0.4, type:"ease"}}
    >
        {children}
    </motion.div>

}

const Routes = () => {
    const location = useLocation(); // To access the current location
    return (
        <AnimatePresence mode="wait">
            <RoutesRR location={location} key={location.pathname}>
                <Route path="/" element={<AnimateWrapper><HomePage /></AnimateWrapper>}></Route>
                <Route path="/anime/:id/:name" element={<AnimateWrapper><AnimePage /></AnimateWrapper>}></Route>
            </RoutesRR>

        </AnimatePresence>
    )
}

export default Routes