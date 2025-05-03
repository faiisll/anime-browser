import clsx from 'clsx';
import React, { useState } from 'react';


const PaginationNumber = ({children = "1", isActive = false, ...props}) => {
    return (
        <div {...props} className={clsx('px-3 py-1 w-fit rounded-lg transition-all', isActive &&  'bg-blue-500 text-white', !isActive && !props.disabled ? 'hover:bg-blue-500 hover:text-white cursor-pointer' : 'cursor-not-allowed')}>{children}</div>
    )
}

const PaginationListNumber = ({lastPage = 7, page, setPage = () => {}, ...props}) => {

    const handlePage = (p) => {
        if(!props.disabled){
            setPage(p)
        }
    }
    return (
    <div className='flex gap-1'>
        <div className='hidden sm:flex gap-1'>
            {lastPage >= 7 && page + 4 > lastPage && <PaginationNumber {...props} onClick={() => {handlePage(1)}}>{1}</PaginationNumber>}
            {lastPage >= 7 && page + 4 > lastPage && <div className='px-3 py-1 w-fit'>...</div>}
            {lastPage > 2 && page > lastPage-1 && <PaginationNumber {...props} onClick={() => {handlePage(page-2)}}>{page-2}</PaginationNumber>}
            {lastPage > 2 && (page > lastPage-2 || (page>= 2 && page <= 3)) && <PaginationNumber {...props} onClick={() => {handlePage(page-1)}}>{page-1}</PaginationNumber>}
        </div>
        <PaginationNumber isActive={true} >{page}</PaginationNumber>
        <div className='hidden sm:flex gap-1'>
            {page < lastPage && <PaginationNumber {...props} onClick={() => {handlePage(page+1)}}>{page+1}</PaginationNumber>}
            {page+1 < lastPage && <PaginationNumber {...props} onClick={() => {handlePage(page+2)}}>{page+2}</PaginationNumber>}
            {lastPage >= 7 && page+3 < lastPage && <div className='px-3 py-1 w-fit'>...</div>}
            {lastPage >= 7 && page+2 <lastPage && <PaginationNumber {...props} onClick={() => {handlePage(lastPage)}}>{lastPage}</PaginationNumber>}
        </div>
        

    </div>
)

}

const PaginationButton = ({children, disabled = false, ...props}) => {
    return (<div {...props} className={clsx('px-3 py-1 w-fit rounded-lg transition-all flex justify-center items-center', !disabled && 'hover:bg-blue-500 hover:text-white cursor-pointer', disabled && 'text-gray-500 cursor-not-allowed')}>{children}</div>)
}

const Pagination = ({disabled = false, lastPage = 7, limit = 10, total= 990, page = 1, setPage = (e) => {}}) => {

    const next = () => {
        if(page < lastPage && !disabled){
            setPage(page+1)
        }
    }

    const prev = () => {
        if(page > 1 && !disabled){
            setPage(page-1)
        }
    }
    return (
        <div className='w-full flex bg-white shadow-lg lg:px-12 px-2 py-4 rounded-lg items-center'>
            
            <div className='grow'>
                <div className='w-full flex gap-2'>
                    {page > 2 && <PaginationButton disabled={disabled || page === 1} onClick={() => {setPage(1)}} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </PaginationButton>}
                    <PaginationButton disabled={disabled || page === 1} onClick={prev} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </PaginationButton>
                    <PaginationListNumber disabled={disabled} lastPage={lastPage} page={page} setPage={setPage} />
                    <PaginationButton disabled={disabled || page === lastPage} onClick={next}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </PaginationButton>
                    {page <  lastPage-4 &&<PaginationButton disabled={disabled || page === lastPage} onClick={() => {setPage(lastPage)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </PaginationButton>}
                </div>
            </div>
            <span className='text-sm text-gray-800'>{total > 0 ? `${((limit*(page-1))+1)}-${limit*page} of ${total} results` : 'No result'}</span>
        </div>
    );
}

export default Pagination;
