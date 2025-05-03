import React from 'react';

const EmptySearch = () => {
    return (
        <div className='w-full h-full flex justify-center items-center min-h-[500px]'>
            <div className='flex flex-col items-center gap-10'>
                <div className='p-10 bg-gray-100 rounded-full w-fit '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-20 h-20 fill-gray-700" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div>

                <div className='flex flex-col items-center'>
                    <h5 className='text-xl'>No result found</h5>
                    <p className='text-xs text-gray-400'>Try adjust your search or filter to find you're looking for.</p>
                </div>
            </div>
        </div>
    );
}

export default EmptySearch;
