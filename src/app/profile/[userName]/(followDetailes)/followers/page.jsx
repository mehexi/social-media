import { getUserData } from '@/actions/getUserData';
import React from 'react';
import { getFollow } from '@/actions/getFollow';

const page = async({params}) => {
    const param = await params
    const userData = await getUserData(param.userName)
    const following = await getFollow({followeeId: userData.id})
    console.log(following)
    return (
        <section className="flex flex-col items-center h-screen overflow-x-auto">
            followers
        </section>
    );
};

export default page;