import React from 'react';
import ProfileBackButton from './ProfileBackButton';
import ProfileImage from './ProfileImage';

const ProfileBody = ({user}) => {
    return (
        <>
            <ProfileBackButton userData={user} />
            <ProfileImage userData={user} />
        </>
    );
};

export default ProfileBody;