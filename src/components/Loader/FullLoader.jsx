import React from 'react';
import { AnimatePresence, motion } from "motion/react"

const FullLoader = ({show = false}) => {
    return (
        <AnimatePresence initial={false}>
            {show ? 
            (<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-full absolute z-50 left-0 top-0 flex justify-center items-center'>
                <div className='absolute w-full h-full bg-black opacity-20'></div>
                <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </motion.div>) : null}
        
        </AnimatePresence>
    );
}

export default FullLoader;
