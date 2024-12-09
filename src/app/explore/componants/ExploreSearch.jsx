import { Separator } from '@/components/ui/separator';
import { Search, Settings } from 'lucide-react';
import React from 'react';

const ExploreSearch = () => {
    return (
        <>
        <div className='w-full flex items-center justify-between px-6 py-6'>
            <div className='flex gap-3 bg-secondary px-3 py-2 w-11/12 rounded-full'>
            <Search/>
            <input className='focus:outline-none w-full bg-transparent h-full' placeholder='Search'/>
            </div>
            <Settings/>
        </div>
        <Separator/>
        </>
    );
};

export default ExploreSearch;