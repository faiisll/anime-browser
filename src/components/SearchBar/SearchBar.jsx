import React, { useEffect, useRef } from 'react';

const SearchBar = ({value, onInput = (val) => {}, placeholder = "", loading = false, disabled=false},) => {
    const inputRef = useRef(null)

    const focusInput = () => {
        if(inputRef.current){
            inputRef.current.focus()
        }
    }

    const clearInput = () => {
        if(value && !loading){
            onInput("")
        }
    }


    return (
        <div onClick={focusInput} tabIndex="0" className='peer focus-within:outline-2 focus-within:outline-blue-500 w-full border flex bg-gray-50 rounded-lg overflow-hidden pl-4 items-center gap-2 border-gray-200'>
            <input placeholder={placeholder} value={value} onInput={(e) => {onInput(e.target.value)}} ref={inputRef} className='grow outline-none text-gray-700' />
            <div onClick={clearInput} tabIndex="0" className='w-12 h-10 bg-white flex justify-center items-center border-l border-gray-200'>
                {!value && !loading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>} 
                {value && !loading && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>}
                {loading && <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
            </div>
        </div>
    );
}

export default SearchBar;
