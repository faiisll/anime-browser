import clsx from 'clsx';
import React from 'react';

const FilterContainer = ({children, shadow="shadow-xl"}) => {
    return (
        <div className={clsx('w-full bg-white rounded-lg px-4 py-4 flex flex-col', shadow)}>
            <div className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                </svg>
                <h4 className='font-medium text-gray-800'>FILTER</h4>

            </div>

            <div className='w-full'>
                {children}
            </div>
        </div>
    );
}

export default FilterContainer;
