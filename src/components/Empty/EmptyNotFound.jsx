import React from 'react';
import { useNavigate } from 'react-router';

const EmptyNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full flex justify-center items-center min-h-[500px]'>
            <div className='flex flex-col items-center gap-10'>
                <div className='p-10 bg-gray-100 rounded-full w-fit '>
                    <h1 className='text-8xl'>404</h1>
                </div>

                <div className='flex flex-col items-center'>
                    <h5 className='text-2xl'>Page Lost</h5>
                    <p className='text-xs text-gray-400'>We can't found this page.</p>

                    <div className='flex items-center gap-2 mt-10 cursor-pointer' onClick={() => {navigate("/", {replace: true})}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                        <span>Back to home</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyNotFound;
