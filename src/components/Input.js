import React, { useState } from 'react';
import { useMutation } from 'urql';

function Input({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form
      style={{ position: 'sticky', bottom: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
    >
      <input
        value={value}
        onChange={handleChange}
        placeholder="Message"
        style={{
          width: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          border: '1px solid rgb(230, 230, 230)',
          borderRadius: '15px',
          padding: '.3rem .5rem',
          background: '#2e2e2e',
          color: 'white',
        }}
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '-18px',
          borderRadius: 100,
          background: 'rgb(100, 150, 220)',
          color: '#fff',
          border: 'none',
          padding: '.3rem',
          width: 29,
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        ↑
      </button>
    </form>
  );
}

const NEW_COMMENT_MUTATION = `
mutation NewCommentMutation(
  $body: String!
  $subjectId: String!
) {
  gitHub {
    addComment(
      input: { subjectId: $subjectId, body: $body }
    ) {
      commentEdge {
        node {
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
`;

function NewCommentInput() {
  const [mutationResult, executeMutation] = useMutation(NEW_COMMENT_MUTATION);

  const handleSubmit = (body) => {
    executeMutation({ subjectId: 'MDU6SXNzdWU4NTc0MzUwMTY=', body });
  };

  console.log({ mutationResult });
  return <Input onSubmit={handleSubmit} />;
}

export default NewCommentInput;
