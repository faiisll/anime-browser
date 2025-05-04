import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react"

const Collapse = ({title = "", defaultValue= false, children}) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(defaultValue)
    }, [])
    return (
        <div className='w-full mt-2'>
            <div className='flex justify-between py-2 cursor-pointer text-gray-800 dark:text-gray-300' onClick={() => { setShow(!show)}}>
                <h5 className='text-sm'>{title}</h5>
                <motion.div
                animate={{
                    scale: !show ? -1 : 1,
                }}
                transition={{
                    duration: 0.1,
                    ease: "easeInOut", 
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                    </svg>
                </motion.div>
            </div>

            <AnimatePresence>
                {show && (
                <motion.div
                key="unique-key"
                initial={{ opacity: 0, scaleY: 0 }} 
                animate={{ opacity: 1, scaleY: 1 }} 
                exit={{ opacity: 0, scaleY: 0 }} 
                transition={{ duration: 0.1 }} 
                className="px-2 py-1 text-sm origin-top"
                >
                    {children}
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Collapse;
