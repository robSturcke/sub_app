import React from 'react';
import { useQuery } from 'urql';

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

function Comments() {
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
    <ul>
      {result.data.gitHub.repository.issue.comments.nodes.map((commentNode) => {
        return <li key={commentNode.id}>{commentNode.body}</li>;
      })}
    </ul>
  );
}

export default Comments;
