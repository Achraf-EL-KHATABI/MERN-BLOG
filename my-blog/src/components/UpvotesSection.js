import React from 'react';

const UpvotesSection = ({ articleName, upvotes, SetArticleInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`,
            { method: 'POST' });
        const body = await result.json();
        SetArticleInfo(body);
    };
    return (
        <div id="upvotes-section">
            <button onClick={() => upvoteArticle()}>Add Upvote</button>
            <h4>This post has been upvoted {upvotes} times!</h4>
        </div>
    );
}

export default UpvotesSection;