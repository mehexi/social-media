import { ThumbsUp } from 'lucide-react';
import React from 'react';

const NotificationItem = ({notification}) => {
    return (
        <div className='h-20 flex items-center gap-3 bg-secondary px-6 py-3 rounded-xl'>
            <div className='h-full aspect-square rounded-full bg-primary relative border'>
                <div className='h-8 bg-red-500 aspect-square rounded-full absolute bottom-0 right-0 flex items-center justify-center'>
                    <ThumbsUp size={14} fill='white'/>
                </div>
            </div>
            <h1>{notification.content}</h1>
        </div>
    );
};

export default NotificationItem;