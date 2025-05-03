import React, { useEffect, useMemo, useState } from 'react';
import FilterContainer from './FilterContainer';
import Collapse from '../Collapse/Collapse';
import FilterRadios from './FilterRadios';

const statusOptions = [
    {
        label: "All",
        value: ""
    },
    {
        label: "Complete",
        value: "complete"
    },
    {
        label: "Airing",
        value: "airing"
    },
    {
        label: "Upcoming",
        value: "upcoming"
    },
]

const types = [
    {
        label: "All",
        value: ""
    },
    {
        label: "Tv",
        value: "tv"
    },
    {
        label: "Movie",
        value: "movie"
    },
    {
        label: "OVA",
        value: "ova"
    },
    {
        label: "Special",
        value: "special"
    },
]
const FilterBar = ({onChange = () => {}, value={status: '', type:''}}) => {
    const [status, setStatus] = useState("")
    const [type, setType] = useState("")
    const [firstMount, setFirstMount] = useState(true)

    const clearable = useMemo(() => {
        return status || type
    }, [type, status])

    const clearFilter = () => {
        setStatus('')
        setType('')
    }


    //Inisiate default value from props
    useEffect(() => {
        if(firstMount){
            setStatus(value.status)
            setType(value.type)
        }
        setFirstMount(false)
    }, [])

    useEffect(() => {
        if(!firstMount){
            onChange({status, type})
        }
    }, [status, type])
    return (
        <FilterContainer>
            <Collapse title='Status' defaultValue={true}>
                <FilterRadios options={statusOptions} value={status} onChange={(e) => {setStatus(e)}} />
            </Collapse>
            <Collapse title='Anime Type' defaultValue={true}>
                <FilterRadios options={types} value={type} onChange={(e) => {setType(e)}} />
            </Collapse>
            
            {clearable && <div onClick={clearFilter} className='w-full bg-rose-500 rounded-lg cursor-pointer text-white text-center py-1 mt-4 hover:bg-rose-600 transition-colors'>
                Clear
            </div>}
        </FilterContainer>
    );
}

export default FilterBar;
