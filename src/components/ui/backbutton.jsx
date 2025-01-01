"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './button';
import { ChevronLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter()
    return (
        <Button onClick={()=>router.back()} variant='ghost' size='icon'>
            <ChevronLeft/>
        </Button>
    );
};

export default BackButton;