import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the blog data for editing.');
        }
        return res.json();
      })
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author);
        setIsPending(false);
      })
      .catch(err => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT', // Use PUT for full updates, or PATCH for partial updates
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }).then(() => {
      navigate(`/blogs/${id}`); // Redirect to the blog details page
    });
  };

  return (
    <div className="create">
      <h2>Edit Blog</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && (
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <label>Blog author:</label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">Mario</option>
            <option value="yoshi">Yoshi</option>
          </select>
          <button>Update Blog</button>
        </form>
      )}
    </div>
  );
};

export default Edit;
