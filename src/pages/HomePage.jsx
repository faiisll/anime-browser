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
import BottomSheet from '../components/BottomSheet/BottomSheet';
import EmptySearch from '../components/Empty/EmptySearch';
import { useNavigate } from 'react-router';
import ToggleDark from '../components/ToggleDark/ToggleDark';

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
    const [showMobileFilter, setShowMobileFilter] = useState(false)
    const navigate = useNavigate()

    const fetchData = () => {
        setLoading(true)
        axios.get('https://api.jikan.moe/v4/anime', {params: {limit, page, q: search, ...filter}}).then(res => {
            if(res.data.data) {
                setData([...res.data.data])
            }
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

    const navigateDetail = (id = "", name = "") => {
        let nameUrl = name.replace(/\s+/g, '_');
        nameUrl = nameUrl.replace(/[^a-zA-Z0-9_:\-]/g, '');
        navigate(`/anime/${id}/${nameUrl}`)
    }

    return (
        <>
            <div className='flex md:hidden'>
                <BottomSheet show={showMobileFilter} changeShow={setShowMobileFilter}>
                    <div className='w-ful h-full px-2'>
                        <FilterBar value={filter} onChange={setFilter} shadow={'shadow-none'} />

                    </div>
                </BottomSheet>

            </div>
            <div className={clsx('w-full bg-white dark:bg-gray-950 dark:border-b-0 border-b border-gray-200 py-4 flex px-2 fixed z-40')}>
                <div className='w-full xl:px-36 2xl:px-60 lg:px-20 px-4 flex gap-2'>
                    <div className='grow'>
                        <SearchBar disabled={loading} loading={typing || loading} placeholder="Search anime title" onInput={setSearch} value={search} />
                    </div>
                    <ToggleDark />
                </div>

            </div>
            <div className='w-full flex flex-col gap-10 relative'>

                

                <div className='w-full xl:px-36 2xl:px-60 lg:px-20 flex flex-col px-4 gap-4 pb-4 pt-24'>

                    {/* Mobile filter trigger button */}
                    <div className='w-full flex justify-end md:hidden'>
                        <div
                        onClick={() => {setShowMobileFilter(true)}}
                        className='flex items-center gap-2 bg-white dark:bg-gray-950 dark:text-gray-300 shadow-lg rounded-lg p-2 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <h4 className='font-medium text-gray-800 dark:text-gray-300'>FILTER</h4>

                        </div>
                    </div>


                    <div className='w-full flex gap-4'>

                        {/* Desktop & tablet filter bar */}
                        <div className='min-w-[240px] h-9 hidden md:block'>
                            <FilterBar value={filter} onChange={setFilter} />
                        </div>
                        <div className='grow min-h-[500px] relative'>
                            {/* <FullLoader show={loading} /> */}

                            {!data.length && !loading && <EmptySearch />}
                            <motion.div
                            key={page+debouncedSearch+filter.status+filter.type} // Key to reset animation on refetch
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={variants}
                            className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                                
                                {data.map((anime, index) => (
                                    <motion.div
                                    layout
                                    key={(index + 1) * page}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1 ,scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.08, type:'spring', damping: 20, stiffness:300 }}
                                    >
                                        <AnimeCard key={(index+1)*page}
                                        onClick={() => {navigateDetail(anime.mal_id, anime.title)}}
                                        title={anime.title}
                                        image={anime?.images?.webp?.image_url} 
                                        type={anime?.type}
                                        status={anime?.status}
                                        />

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

        </>
    );
}

export default HomePage;
