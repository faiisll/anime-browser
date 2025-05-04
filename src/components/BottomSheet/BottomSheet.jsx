import React from 'react';
import {motion, AnimatePresence} from "motion/react"

const BottomSheet = ({show = false, changeShow = () => {}, children}) => {

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                className="fixed w-screen h-screen z-50 top-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                >
                    <motion.div
                    className="w-full h-full relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}>
                        <motion.div
                        onClick={() => {changeShow(false)}}
                        className="w-full h-full absolute bg-black top-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0, transition: {delay: 0.2} }}
                        transition={{ duration: 0.1 }}/>

                        <motion.div
                        className="h-2/3 w-full bg-white dark:bg-gray-950 bottom-0 absolute rounded-t-xl"
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 50, damping: 10, duration: 0.05 }}>
                            <div className='w-full h-full relative overflow-y-scroll'>
                                {children}
                            </div>

                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default BottomSheet;
