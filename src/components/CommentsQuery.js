import React from 'react';
import Comments from './Comments';
import useCommentsHistory from './hooks/useCommentsHistory';

function QueryComments() {
  const comments = useCommentsHistory();
  // console.log({ result });

  if (!comments) {
    return <p>Loading...</p>;
  }

  return <Comments comments={comments} />;
}

export default QueryComments;
