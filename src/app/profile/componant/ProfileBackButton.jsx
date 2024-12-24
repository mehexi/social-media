import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

const ProfileBackButton = ({userData}) => {
    const {userName,tweets} = userData
    return (
        <div className='w-full px-6 py-3 border-b flex gap-3 items-center bg-background'>
            <div>
                <Button size="icon" variant='ghost'> <ChevronLeft/> </Button>
            </div>
            <div>
                <h1 className='capitalize'>@{userName}</h1>
                <p className='text-secondary-foreground/50'>{tweets.length} post</p>
            </div>
        </div>
    );
};

export default ProfileBackButton;