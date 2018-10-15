import React from "react";
import { Link } from "@reach/router";
import "./pet.css";

const Pet = ({ id, name, animal, breed, media, location }) => {
  let photos = [];

  if (media && media.photos && media.photos.photo) {
    photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
  }

  const value = photos[0] ? photos[0].value : "";

  return (
    <Link className="pet" to={`/details/${id}`}>
      <div className="pet-image">
        <img src={value} alt={name} />
      </div>
      <div className="pet-info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
