import clsx from 'clsx';
import React from 'react';

const StatSkeleton = () => {
    return (
        <div className='flex gap-8 animate-pulse flex-col md:flex-row'>
            <div className='flex flex-col items-center px-8 md:border-r border-gray-300'>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
                <div className='h-10 bg-gray-200 rounded text-white w-full mt-2'></div>
                <div className='h-4 bg-gray-200 rounded w-36 mt-2'></div>
            </div>

            <div className='flex flex-col grow justify-around'>
                <div className='flex gap-8'>
                <div className='h-6 bg-gray-200 rounded w-20'></div>
                <div className='h-6 bg-gray-200 rounded w-36'></div>
                <div className='h-6 bg-gray-200 rounded w-20'></div>
                </div>
                <div className='flex gap-4 text-sm mt-2'>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
                </div>
            </div>
        </div>
    )
}

const Score = ({score = 5}) => {

    const scoreClass = clsx('text-xl p-2 text-white rounded aspect-square text-center flex items-center', score <= 3 && "bg-rose-500", score > 3 && score < 7  && "bg-orange-500", score >= 7 && 'bg-emerald-500')
    return <div className={scoreClass}>
        {score ? score : "N/A"}
    </div>
}

const AnimeStat = ({data, loading = true}) => {
    return (
        loading || !data ? <StatSkeleton /> :
        <div className='flex gap-8 flex-col sm:flex-row text-gray-800 dark:text-gray-300'>
            <div className='flex flex-col items-center px-8 sm:border-r border-gray-300'>
                <span className='text-sm'>Score</span>
                <Score score={data.score}/>
                {/* <div className='text-xl p-2 bg-blue-500 text-white rounded'>
                    {data.score ? data.score : "N/A"}
                </div> */}
                <span className='text-xs text-gray-400'>{data.scored_by ? data.scored_by : "N/A"} users</span>

            </div>
            
            <div className='flex flex-col grow justify-around gap-4 sm:gap-1'>
                <div className='flex gap-8 text-lg'>
                    <h3 className='font-light'>
                        Ranked <span className='font-semibold'>#{data.rank}</span>
                    </h3>
                    <h3 className='font-light'>
                        Popularity <span className='font-semibold'>#{data.popularity}</span>
                    </h3>
                    <h3 className='font-light'>
                        Members <span className='font-semibold'>{data.members}</span>
                    </h3>
                </div>
                <div className='flex gap-4 text-sm justify-center sm:justify-start'>
                    {data.season && data.year ? <small>{data.season} {data.year}</small> :
                    <small>N/A</small>}
                    <small className='px-2 border-x border-gray-300'>{data.type}</small>
                    <small>{data.studios.length ? data.studios[0].name : 'N/A'}</small>

                </div>
            </div>

        </div>
    );
}

export default AnimeStat;
