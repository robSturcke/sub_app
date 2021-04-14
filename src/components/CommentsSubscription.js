import React, { useState, useEffect } from 'react';
import { useSubscription } from 'urql';
import Comments from './Comments';
import useCommentsHistory from './hooks/useCommentsHistory';

const COMMENTS_LIST_SUBSCRIPTION = `
subscription CommentsListSubscription(
  $repoOwner: String = ""
  $repoName: String = ""
) {
  github {
    issueCommentEvent(
      input: { repoOwner: $repoOwner, repoName: $repoName }
    ) {
      action
      comment {
        author {
          avatarUrl(size: 10)
          login
        }
        id
        url
        viewerDidAuthor
      }
    }
  }
}
`;

function CommentsSubscription() {
  const handleSubscription = (comments = [], commentEvent) => {
    if (!commentEvent) {
      return comments;
    }
    return [...comments, commentEvent.github.issueCommentEvent.comment];
  };

  const [pauseCommentsHistory, setPauseCommentsHistory] = useState(false);

  const commentsHistory = useCommentsHistory({ pause: pauseCommentsHistory });
  const commentsHistoryLength = commentsHistory.length;

  useEffect(() => {
    if (commentsHistoryLength !== 0) {
      setPauseCommentsHistory(true);
    }
  }, [commentsHistoryLength]);

  const [commentSubscriptionResult] = useSubscription(
    {
      query: COMMENTS_LIST_SUBSCRIPTION,
      variables: {
        repoName: 'egghead-graphql-subscriptions',
        repoOwner: 'theianjones',
      },
    },
    handleSubscription
  );

  // console.log({ commentSubscriptionResult });

  const commentsWithHistory = [
    ...commentsHistory,
    ...(commentSubscriptionResult.data || []),
  ];

  return <Comments comments={commentsWithHistory} />;
}

export default CommentsSubscription;
