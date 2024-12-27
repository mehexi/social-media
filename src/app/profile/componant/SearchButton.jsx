'use client'
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SearchButton = ({username}) => {
    const router = useRouter()
    const handle = () => {
        router.push(`/explore?q=from:${username}`)
    }
    return (
        <Button className='rounded-full h-8 w-8' variant='outline' size='icon' onClick={handle}><Search/></Button>
    );
};

export default SearchButton;