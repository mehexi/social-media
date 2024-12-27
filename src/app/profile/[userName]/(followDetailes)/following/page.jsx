import { getUserData } from '@/actions/getUserData';
import React from 'react';
import { getFollow } from '@/actions/getFollow';

const page = async({params}) => {
    const param = await params
    const userData = await getUserData(param.userName)
    const followers = await getFollow({followerId: userData.id})
    console.log(followers)
    return (
        <section className="flex flex-col items-center h-screen overflow-x-auto">
            following
        </section>
    );
};

export default page;