import { getReports } from '@/actions/getReports';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import AllIssue from './componant/AllIssue';

const page = async() => {
    const allIssue =await getReports()
    console.log(allIssue)
    return (
        <div className='h-screen'>
            <Card className='bg-transparent border-none'>
                <CardHeader>
                    <CardTitle>All reports</CardTitle>
                </CardHeader>
                <Separator/>
                <AllIssue issues={allIssue} />
            </Card>        
        </div>
    );
};

export default page;