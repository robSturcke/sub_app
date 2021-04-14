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

  console.log({ result });

  return null;
}

export default Comments;
