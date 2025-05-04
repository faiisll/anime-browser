

import React, { useEffect, useMemo, useState } from 'react';
import AnimeStat from '../components/Stat/AnimeStat';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const AnimePage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [isError, setIsError] = useState(false)
    let { id, name } = useParams();


    const fetchDetail = () => {
        setLoading(true)
        axios.get(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => {
            if(res.data.data){
                setData(res.data.data)
            }
        }).catch(err => {
            navigate("/404", {replace: true})
            console.log(res);
        }).finally(() => {
            setLoading(false)
        })
    }

    const parseNameToUrl = (name = "") => {
        let nameUrl = name.replace(/\s+/g, '_');
        nameUrl = nameUrl.replace(/[^a-zA-Z0-9_:\-]/g, '');
        return nameUrl
    }

    useEffect(() => {
        if(data){
            // checking is name same as url name pass and replace if different
            const dataName = parseNameToUrl(data.title)
            if(name != dataName) navigate(`/anime/${id}/${dataName}`, {replace:true})

        }
    }, [data])

    useEffect(() => {
        if(id){
            fetchDetail()
        }
    }, [id])
    return (
        <div className='w-screen min-h-screen xl:px-36 2xl:px-60 lg:px-20 px-4 flex items-center'>
            <div className='grow shadow-xl w-full bg-white rounded-xl flex flex-col py-10 px-4 md:px-20 relative'>
                <div className='flex flex-col md:flex-row gap-2 md:gap-10 grow'>
                    <div className='min-w-[200px] max-w-[200px] gap-4 min-h-full rounded-lg overflow-hidden flex flex-col justify-between'>
                        {loading && !data ? <div className='w-full animate-pulse bg-gray-200'></div> :
                        <img src={data?.images?.webp?.large_image_url} className='object-cover w-full rounded-lg' />}

                        <div onClick={() => {navigate(-1)}} className='flex gap-1 items-center cursor-pointer hover:text-blue-500 transition-all'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                            </svg>
                            <span>Back</span>

                        </div>
                    </div>
                    <div className='flex flex-col grow gap-4'>
                        {!loading && data ? <h2 className='text-3xl text-center sm:text-left'>{data.title}</h2> : 
                        <div className='w-md h-10 animate-pulse bg-gray-200 rounded'></div>
                        }
                        
                        

                        <AnimeStat loading={loading || !data} data={data}/>

                        <div className='mt-2'>
                            {!loading && data && <p className='font-light text-gray-700'>
                                {data.synopsis}
                            </p>}
                            {loading && !data && <div className='flex flex-col animate-pulse gap-4'>
                                <div className='w-full h-4 bg-gray-200 rounded'></div>
                                <div className='w-full h-4 bg-gray-200 rounded'></div>
                                <div className='w-full h-4 bg-gray-200 rounded'></div>
                                <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
                            </div>}


                        </div>
                            
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AnimePage;
