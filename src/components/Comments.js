import React from 'react';

function Comments({ comments }) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <ul
      style={{
        listStyle: 'none',
        paddingLeft: '0px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        overflowY: 'scroll',
        maxHeight: 600,
        width: 400,
        margin: 0,
      }}
    >
      {comments.map((commentNode) => {
        return (
          <li
            key={commentNode.id}
            style={{
              color: commentNode.viewerDidAuth ? 'rgb(190, 190, 190)' : '#333',
              padding: '1.1rem 1rem',
              marginBottom: '1rem',
              width: '80%',
              borderRadius: 7,
              background: commentNode.viewerDidAuth
                ? 'rgba(100, 150, 220, .9)'
                : 'rgba(255, 255, 255, .9)',
              alignSelf: commentNode.viewerDidAuth ? 'flex-start' : 'flex-end',
            }}
          >
            {/* {!commentNode.viewerDidAuthor && (
              <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <small>by </small>
                <strong>{commentNode.author.login}</strong>
              </div>
            )} */}
            <div>
              <img
                style={{
                  float: commentNode.viewerDidAuth ? 'left' : 'right',
                  borderRadius: 100,
                  margin: 5,
                }}
                src={commentNode.author.avatarUrl}
                width="50"
                alt="Github"
              />
            </div>
            <p>{commentNode.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
