import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    })
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleDelete}>delete</button>  
          <Link to={`/edit/${blog.id}`}><button>Edit Blog</button> </Link>  
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;