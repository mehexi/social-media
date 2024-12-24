import React from 'react';
import ProfileBackButton from './ProfileBackButton';
import ProfileImage from './ProfileImage';
import ProfileBio from './ProfileBio';
import { Separator } from '@/components/ui/separator';
import ProfileSwitcher from './ProfileSwitcher';
import ProfileDatas from './ProfileDatas';
import { getTweetByUserId } from '@/actions/getTweetByuserId';

const ProfileBody = async ({user,searchParam}) => {
    const getData = await  getTweetByUserId(user.id,searchParam)
    return (
        <>
            <ProfileBackButton userData={user} />
            <ProfileImage userData={user} />
            <ProfileBio userData={user} />
            <ProfileSwitcher/>
            <Separator />
            <ProfileDatas searchParam={searchParam}/>
        </>
    );
};

export default ProfileBody;