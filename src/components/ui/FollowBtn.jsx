import React from 'react';
import { Button } from './button';
import { useUser } from '@clerk/nextjs';

const FollowBtn = ({user}) => {

    const {user: userData} = useUser();
    console.log(user)
    console.log(userData)

    if (user.clerkUserId === userData.id) {
        return null
    }

    return (
        <Button className='h-8 rounded-full' variant='secondary'>Follow</Button>
    );
};

export default FollowBtn;