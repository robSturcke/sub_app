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

const useCommentHistory = (options) => {
  const { pause = false } = options;
  const [result] = useQuery({
    query: COMMENTS_QUERY,
    variables: {
      repoOwner: 'robSturcke',
      repoName: 'sub_app',
      issueNumber: 1,
    },
    pause,
  });

  if (result.data) {
    return result.data.gitHub.repository.issue.comments.nodes;
  } else {
    return [];
  }
};

export default useCommentHistory;
