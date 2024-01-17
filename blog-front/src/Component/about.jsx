import React from "react";
import genericImage from "../Component/icons/about.jpg"; // Remplacez par le chemin réel de votre image générique

const About = () => {
  return (
    <div className="container mt-4">
      <div className="card" style={{ background: "#ffffff", padding: "20px", maxHeight: "600px", overflow: "hidden" }}>
        <div className="row">
          <div className="col-md-6">
            <img src={genericImage} alt="Generic Image" style={{ maxWidth: "100%", height: "80%", objectFit: "cover", borderRadius: "5px" }} />
          </div>
          <div className="col-md-6">
            <h2>About</h2>
            <p style={{ textAlign: "justify" }}>
              Notre plateforme est un coin où les mots dansent pour raconter des histoires, partager des idées et explorer l'extraordinaire dans l'ordinaire.
            </p>
            <p style={{ textAlign: "justify" }}>
              L'architecte de ce blog. Passionné par le partage de chacun de vous, on a créé cet espace pour capturer et exprimer les pensées qui tourbillonnent dans notre esprit et partager des découvertes inspirantes avec vous.
            </p>
            <p style={{ textAlign: "justify" }}>
              Ce blog n'est pas seulement un ensemble d'articles, mais un voyage partagé. Que vous soyez un lecteur assidu ou que vous ayez atterri ici par hasard, je vous invite à vous attarder et à explorer. Vous trouverez ici une collection éclectique d'écrits, des réflexions personnelles aux guides pratiques.
            </p>
            <p style={{ textAlign: "justify" }}>
              Plus qu'un simple blog, c'est une communauté où les idées sont célébrées, les expériences partagées et les commentaires appréciés. Nous croyons en la puissance des mots pour inspirer, éduquer et connecter.
            </p>
            <p style={{ textAlign: "justify" }}>
              En dehors de l'univers numérique, chaque article que vous lisez ici est une invitation à la conversation. N'hésitez pas à partager vos pensées, questions ou suggestions.
            </p>
            <p style={{ textAlign: "justify" }}>
              Merci d'être ici et de faire partie de cette aventure littéraire. Ensemble, explorons les horizons infinis des mots.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
