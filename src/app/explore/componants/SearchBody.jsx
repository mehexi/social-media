import React from 'react';

const SearchBody = ({tweets}) => {
    
    return (
        <div>
            {
                tweets.map(tweet => <h1 key={tweet.id}>{tweet.content}</h1>)
            }
        </div>
    );
};

export default SearchBody;