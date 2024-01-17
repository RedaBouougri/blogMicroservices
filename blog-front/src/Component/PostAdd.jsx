import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const PostAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImages] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Création de la date actuelle
    const currentDate = new Date();

    // Formatage de la date au format ISO (String)
    const formattedDate = currentDate.toISOString();
    const username = authService.getCurrentUser();

    axios.post("http://localhost:8070/post/save/"+username.username, {
      title: title,
      description: description,
      image: image,
      date_pub: formattedDate, 
    }).then((response) => {
      setTitle("");
      navigate("/listpost");
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mt-4" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="card" style={{ background: "#f6efef", borderRadius: "10px", padding: "20px", width: "80%", maxWidth: "600px", height: "80%" }}>
        <form onSubmit={handleSubmit}>
          <b><h2 style={{ fontSize: 30, textAlign: "center" }}>Add Post</h2></b>
          <div className="row">
            <div className="col-md-12">
  
              <div className="form-group row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">
                  Title:
                </label>
                <div className="col-sm-10">
                  <input type="text" placeholder="title" required className="form-control" id="title" value={title} onChange={(event) => setTitle(event.target.value)} style={{ backgroundColor: "#d9d9d9" }} />
                </div>
              </div>
  
              <div className="form-group row mb-3">
                <label htmlFor="description" className="col-sm-2 col-form-label">Body:</label>
                <div className="col-sm-10">
                  <input type="text" placeholder="description" required className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)} style={{ backgroundColor: "#d9d9d9" }} />
                </div>
              </div>
  
              <div className="form-group row mb-3">
                <label htmlFor="postImage" className="col-sm-2 col-form-label">
                  Photo:
                </label>
                <div className="col-sm-10">
                  <input className="form-control" required type="file" accept="image/*" onChange={handlePhotoChange} style={{ backgroundColor: "#d9d9d9" }} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-primary" style={{ width: '25%', height: '20%' }}>
            <b>Share</b>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAdd;
