import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import AnimeCard from '../components/Card/AnimeCard';
import Pagination from '../components/Pagination/Pagination';
import FullLoader from '../components/Loader/FullLoader';
import axios from 'axios';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { motion } from "motion/react"
import FilterContainer from '../components/Filter/FilterContainer';
import FilterBar from '../components/Filter/FilterBar';

const HomePage = () => {
    const [typing, setTyping] = useState(false)
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [isFirstMount, setIsFirstMount] = useState(true);
    const [filter, setFilter] = useState({status: '', type:''});

    const fetchData = () => {
        setLoading(true)
        axios.get('https://api.jikan.moe/v4/anime', {params: {limit, page, q: search, ...filter}}).then(res => {
            if(res.data.data) setData([...res.data.data])
            if(res.data.pagination) mappingPagination(res.data.pagination)
        }).catch(err => {

        }).finally(() => {
            setLoading(false)
            setIsFirstMount(false)
        })
    }


    const mappingPagination = (pagination) => {
        setLastPage(pagination.last_visible_page)
        setTotal(pagination.items.total)

    }

    useEffect(() => {
        setTyping(true)
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
            setTyping(false)
        }, 250);
        return () => clearTimeout(timeoutId);
    }, [search, 250]);
    
    useEffect(() => {
        setTyping(true)
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(filter);
            setTyping(false)
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [filter, 500]);

    useEffect(() => {
        setPage(1)
        fetchData()
    }, [debouncedSearch])
    useEffect(() => {
        if(!isFirstMount){ // prevent fetch on first render
            fetchData()
        }
    }, [page])

    const variants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
    };

    return (
        <div className='w-full flex flex-col gap-10 relative'>
            <div className={clsx('w-full bg-white border-b border-gray-200 py-4 flex justify-center items-center px-2 fixed z-50')}>
                <div className='w-lg'>
                    <SearchBar disabled={loading} loading={typing || loading} placeholder="Search anime title" onInput={setSearch} value={search} />
                </div>

            </div>

            

            <div className='w-full xl:px-36 2xl:px-60 lg:px-20 flex flex-col gap-4 pb-4 px-2 pt-24'>
                <div className='w-full flex gap-4'>
                    <div className='min-w-[240px] h-9 hidden md:block'>
                        <FilterBar value={filter} onChange={setFilter} />
                    </div>
                    <div className='grow min-h-[500px] relative'>
                        {/* <FullLoader show={loading} /> */}
                        <motion.div 
                        key={page} // Key to reset animation on refetch
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                            {data.map((anime, index) => (
                                <motion.div
                                key={(index + 1) * page}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1 ,scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.08 }}
                                >
                                    <AnimeCard key={(index+1)*page} title={anime.title} image={anime?.images?.webp?.image_url} />

                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
                
                <div className='self-center w-full mb-4'>
                    <Pagination
                    disabled={loading} 
                    total={total} 
                    limit={limit < total ? limit : total} 
                    page={page} 
                    lastPage={lastPage} 
                    setPage={setPage} />
                </div>

            </div>
        </div>
    );
}

export default HomePage;
