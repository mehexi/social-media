import React, { Suspense } from 'react';
import ProfileBackButton from './ProfileBackButton';
import ProfileImage from './ProfileImage';
import ProfileBio from './ProfileBio';
import { Separator } from '@/components/ui/separator';
import ProfileSwitcher from './ProfileSwitcher';
import ProfileDatas from './ProfileDatas';
import { getTweetByUserId } from '@/actions/getTweetByuserId';

const ProfileBody = async ({ user, searchParam }) => {
    const getData = await getTweetByUserId(user, searchParam,);

    return (
        <>
            <ProfileBackButton userData={user} />
            <ProfileImage userData={user} />
            <ProfileBio userData={user} />
            <ProfileSwitcher />
            <Separator />
            <Suspense fallback={<div className='mt-20'>Loading...</div>}>
            <ProfileDatas searchParam={searchParam} tweetData={getData} />
            </Suspense>
        </>
    );
};

export default ProfileBody;
