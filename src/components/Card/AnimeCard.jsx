import React from 'react';
import noImage from "../../assets/images/No-Image.png"

const Tag = ({children}) => {
    return <div className='p-1 bg-gray-300 w-fit text-xs rounded-lg'>
        {children}
    </div>
}
const AnimeCard = ({title = "", image = "", type = "", status=""}) => {
    return (
        <div className='w-full max-w-full aspect-3/5 border border-gray-200 rounded-lg p-2 bg-white flex flex-col gap-4'>
            <div className='aspect-4/5 rounded-lg w-full bg-gray-200'>
                <img src={image} className='object-cover w-full h-full' />
            </div>
            <div className='w-full flex gap-1 justify-center'>
                <Tag>{type}</Tag>
                <Tag>{status}</Tag>
            </div>
            <div className='w-full max-w-full line-clamp-1 overflow-ellipsis'>
                <h2 className='text-center'>{title}</h2>
            </div>

            
        </div>
    );
}

// Custom comparison function
const areEqual = (prevProps, nextProps) => {
    // Only re-render if the title or image changes
    return prevProps.title === nextProps.title && prevProps.image === nextProps.image;
};

export default React.memo(AnimeCard, areEqual);
