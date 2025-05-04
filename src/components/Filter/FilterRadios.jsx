import clsx from 'clsx';
import React from 'react';



const FilterRadio = ({children, isActive = false, ...props}) => {
    return (
        <div {...props} className={clsx('flex gap-2 items-center transition-all cursor-pointer ',!isActive ? 'text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-100' : 'text-blue-500')}>
            {children}
            {isActive && <span className='w-1 h-1 rounded-full bg-blue-500'></span>}
        </div>
    )
}
const FilterRadios = ({options = [{label: '', value: ''}], value="", onChange = () => []}) => {
    return (
        <div className='flex flex-col gap-1'>
            {options.map(opt => (
                <FilterRadio key={opt.value} isActive={opt.value === value} onClick={() => {onChange(opt.value)}}>{opt.label}</FilterRadio>
            ))}
        </div>
    );
}

export default FilterRadios;