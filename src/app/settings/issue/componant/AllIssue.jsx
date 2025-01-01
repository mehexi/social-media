import React from 'react';
import IssueItem from './issueItem';
import { CardContent } from '@/components/ui/card';

const AllIssue = ({issues}) => {
    return (
        <CardContent className='pt-6 flex flex-col gap-3'>
            {
                issues.map(issue => <IssueItem key={issue.id} issue={issue} />)
            }
        </CardContent>
    );
};

export default AllIssue;