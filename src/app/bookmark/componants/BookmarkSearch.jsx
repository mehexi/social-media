import { Search } from 'lucide-react';
import React from 'react';

const BookmarkSearch = () => {
    return (
        <div className='w-full bg-card relative'>
            <div className='flex bg-background py-2 px-3 rounded border gap-3'>
                <Search />
                <input placeholder='Search Your Bookmarks' className='w-full outline-none bg-transparent'/>
            </div>
        </div>
    );
};

export default BookmarkSearch;