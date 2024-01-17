import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [postsRecent, setPostsRecents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/post/all");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8070/post/getLast");
        setPostsRecents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const StyledCard = styled(Card)({
    display: "flex",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    borderRadius: "12px",
    "&:hover": {
      transform: "scale(1.02)",
    },
    backgroundColor: "#f5f3f3",
    maxWidth: "100%",
  });

  const StyledCardContent = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "center", // Center text
    flex: "1 0 auto",
    padding: "16px",
    marginLeft: "20px", // Added margin to the left
  });

  const StyledCardMedia = styled(CardMedia)({
    width: "30%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
    marginLeft: "20px",
  });



  const StyledDescription = styled(Typography)({
    variant: "body1",
    textAlign: "justify",
    marginBottom: "8px",
    wordWrap: 'break-word', // Add this line to enable word wrapping
  });

  const StyledTitle = styled(Typography)({
    variant: "h6",
    component: "div",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "8px",
    width: "100%", // Set width to 100% for centering
  });

  return (
    <div className="" style={{ width: '95%', height: 'auto', marginTop: 100, display: 'flex' }}>
      <div className="post_recent" style={{ width: '25%', margin: 'auto', textAlign: 'center', marginTop: -55, height: "auto" }}>
        <h3>Most Recent</h3>

        {postsRecent.map((p) => (
          <StyledCard key={p.id} style={{ margin: '20px 0', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#d9d9d9" }}>
            <StyledTitle>
              {p.title}
            </StyledTitle>
            <StyledCardMedia style={{ display: 'flex', justifyContent: 'center', height: '60%', width: '80%', alignItems: 'center' }}>
              {p.image && (
                <img
                  src={p.image}
                  alt="Post"
                  style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                />
              )}
            </StyledCardMedia>
            <StyledCardContent style={{ marginTop: 'auto' }}>
              <Link to={`/details/${p.id}`}>
                See More
              </Link>
            </StyledCardContent>
          </StyledCard>
        ))}
      </div>

      <div className="post_new" style={{ width: '70%', height: 'auto', marginLeft: 'auto', marginRight: 0, textAlign: 'center' }}>
  {posts.map((post) => (
    <StyledCard key={post.id}>
      <StyledCardContent>
        <div style={{ textAlign: 'left' }}>
          <StyledTitle>
            {post.title}
          </StyledTitle>
          <StyledDescription style={{ width: 750, height: 'auto', marginBottom: 10 }}>
            {post.description}
          </StyledDescription>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Link to={`/details/${post.id}`} style={{ alignSelf: 'center' }}>
            See More
          </Link>
        </div>
      </StyledCardContent>
      <StyledCardMedia style={{ marginTop: '10px' }}>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            style={{ height: 150, width: 250, borderRadius: '12px' }}
          />
        )}
      </StyledCardMedia>
    </StyledCard>
  ))}
</div>





    </div>

  );
};

export default PostList;
