import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import authService from "../services/auth.service";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getCurrentUser();
        const response = await axios.get("http://localhost:8070/post/findbyuserid/"+user.id);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = (postId) => {
    setSelectedPost(postId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8070/post/delete/${selectedPost}`)
      .then(() => {
        setPosts(posts.filter((item) => item.id !== selectedPost));
        setOpenDialog(false);
      });
  };

  const handleCancelDelete = () => {
    setSelectedPost(null);
    setOpenDialog(false);
  };

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

  const StyledTitle = styled(Typography)({
    variant: "h6",
    component: "div",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "8px",
    width: "100%", // Set width to 100% for centering
  });

  const postsPerRow = 3;
  const postWidth = `calc((75% - ${(postsPerRow - 1) * 20}px) / ${postsPerRow})`;

  return (
    <div className="" style={{ width: '95%', height: 'auto', marginTop: 100, display: 'flex', flexWrap: 'wrap' }}>
      <div className="post_recent" style={{ width: '75%', margin: 'auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {posts.map((p) => (
          <StyledCard key={p.id} style={{ flexBasis: postWidth, margin: '0 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#d9d9d9" }}>
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
            <StyledCardContent style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', flexDirection: 'row' }}>
              <Link to={`/editPost/${p.id}`}>
                <EditIcon style={{ cursor: 'pointer', marginRight: '10px', color: '#ffa800' }} />
              </Link>
              <DeleteIcon style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDeletePost(p.id)} />
            </StyledCardContent>
          </StyledCard>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyPost;
