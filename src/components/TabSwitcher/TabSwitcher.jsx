"use client";
import React from 'react';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const TabSwitcher = () => {
    const pathname = usePathname();

    return (
        <div className='flex w-full'>
            <Link
                href="/"
                className={`w-full flex items-center justify-center py-2 ${
                    pathname === '/' ? 'bg-card' : 'hover:bg-card/40'
                }`}
            >
                For You
            </Link>
            <Separator orientation />
            <Link
                href="/following"
                className={`w-full flex items-center justify-center py-2 ${
                    pathname === '/following' ? 'bg-card' : 'hover:bg-card/40'
                }`}
            >
                Following
            </Link>
        </div>
    );
};

export default TabSwitcher;
