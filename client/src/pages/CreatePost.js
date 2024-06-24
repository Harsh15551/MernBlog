import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor'; // Ensure this path is correct
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />; // Redirect to home page after successful post creation
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <Editor
        value={content}
        onChange={setContent}
      />
      <button type="submit" style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
};

export default CreatePost;
