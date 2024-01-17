// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

// Dummy avatar style
const avatarStyle = {
  width: "40px",
  height: "40px",
  backgroundColor: "#ccc",
  borderRadius: "50%",
  marginRight: "10px",
};

const PostDetails = () => {
  // State variables
  const [postsRecent, setPostsRecents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImages] = useState("");
  const [contents, setContents] = useState("");
  const [comments, setComments] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const username = authService.getCurrentUser();

  // useEffect for fetching data
  useEffect(() => {
    fetchNew();
    fetchRecent();
    fetchComments();
  }, []);

  // Fetch most recent posts
  const fetchRecent = async () => {
    try {
      const response = await axios.get("http://localhost:8070/post/getLast");
      setPostsRecents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch details of a specific post
  const fetchNew = async () => {
    try {
      const response = await axios.get("http://localhost:8070/post/findbyid/" + id);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setImages(response.data.image);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8010/comment/findcomment/id/${id}`);
      setComments(response.data);

      // Fetch usernames for comments
      const userPromises = response.data.map((comment) =>
        findUser(comment.userId)
      );
      const resolvedUsernames = await Promise.all(userPromises);
      setUsernames(resolvedUsernames);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch user details based on user_id
  const findUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8060/api/test/findbyid/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return { username: 'Unknown User' }; // Default username for unknown user
    }
  };

  // Handle form submission for adding a comment
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8010/comment/save", {
      userId: username.id,
      postId: id,
      content: contents,
    }).then((response) => {
      setContents("");
      // Refetch comments after a new comment is added
      fetchComments();
    });
  };

  return (
    <div className="" style={{ width: '95%', height: 'auto', marginTop: 100, display: 'flex' }}>
      <div className="post_recent" style={{ width: '25%', margin: 'auto', textAlign: 'center', marginTop: -55, height: "auto" }}>
        <h3>Most Recent</h3>

        {postsRecent.map((p) => (
          <Card key={p.id} style={{ margin: '20px 0', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#d9d9d9" }}>
            <Typography variant="h6" component="div" fontWeight="bold" textAlign="center" marginBottom="8px" width="100%">
              {p.title}
            </Typography>
            <CardMedia style={{ display: 'flex', justifyContent: 'center', height: '60%', width: '80%', alignItems: 'center' }}>
              {p.image && (
                <img
                  src={p.image}
                  alt="Post"
                  style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                />
              )}
            </CardMedia>
            <CardContent style={{ marginTop: 'auto' }}>
              <Link to={`/details/${p.id}`}>
                See More
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="post_new" style={{ width: 'auto', height: 'auto', display: 'block' }}>
        <Card key={id} style={{ display: "flex", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s", borderRadius: "12px", maxWidth: "100%" }}>
          <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "center", flex: "1 0 auto", padding: "16px", marginLeft: "20px" }}>
            <Typography variant="h6" component="div" fontWeight="bold" textAlign="center" marginBottom="8px" width="100%">
              <h1>{title}</h1>
            </Typography>
            <CardMedia style={{ marginTop: '10px' }}>
              {image && (
                <img
                  src={image}
                  alt="Post"
                  style={{ height: '500px', width: 850, borderRadius: '12px' }}
                />
              )}
            </CardMedia>
            <Typography variant="body1" textAlign="justify" marginBottom="8px" style={{ width: 750, height: 'auto', marginTop: '5 %', marginBottom: '10px', wordWrap: 'break-word' }}>
              {description}
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', marginTop: '5%', height: 'auto', width: '210%' }}>
                <label >Add a Comment:</label>
                <textarea
                  className="form-control"
                  id="comment"
                  type="text"
                  name="comment"
                  rows="4"
                  cols="50"
                  required
                  placeholder="Comment"
                  value={contents} onChange={(event) => setContents(event.target.value)}
                  style={{ marginBottom: '10px' }}
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  Add Comment
                </button>
              </div>
            </form>

            {/* Display comments with scrolling */}
            <div style={{ marginTop: '20px', maxHeight: '300px', width:'100%', overflowY: 'auto' }}>
              <h3>Comments</h3>
              <ul>
                {comments.map((comment, index) => (
                  <li key={comment.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={avatarStyle}></div> 
                    <span>{`${usernames[index]?.username || 'Unknown User'}: ${comment.content}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostDetails;
