import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import PasswordBody from './comnonants/PasswordBody';
import BackButton from '@/components/ui/backbutton';

const page = () => {
    return (
        <Card className='border-none h-screen'>
            <CardHeader className='flex-row p-3'>
              <BackButton/>  <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='pt-3'>
            <PasswordBody/>
            </CardContent>
        </Card>
    );
};

export default page;