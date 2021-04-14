import React from 'react';
import { useQuery } from 'urql';
import Comments from './Comments';

const COMMENTS_QUERY = `query CommentsListQuery(
  $repoOwner: String!
  $repoName: String!
  $issueNumber: Int!
) {
  gitHub {
    repository(name: $repoName, owner: $repoOwner) {
      issue(number: $issueNumber) {
        id
        title
        bodyText
        comments(last: 100) {
          nodes {
            author {
              login
              avatarUrl(size: 100)
            }
            body
            id
            url
            viewerDidAuthor
          }
        }
      }
    }
  }
}
`;

function QueryComments() {
  const [result] = useQuery({
    query: COMMENTS_QUERY,
    variables: {
      repoOwner: 'robSturcke',
      repoName: 'sub_app',
      issueNumber: 1,
    },
  });

  // console.log({ result });

  if (!result.data) {
    return <p>Loading...</p>;
  }

  return (
    <Comments comments={result.data.gitHub.repository.issue.comments.nodes} />
  );
}

export default QueryComments;
