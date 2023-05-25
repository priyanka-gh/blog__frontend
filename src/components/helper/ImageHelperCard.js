import React from "react";
import { API } from "../../backend";

const ImageHelperCard = (card) => {
  const imageurl = card
    ? `${API}/product/photo/${card.card._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div>
      <img
        src={imageurl}
        style={{
          maxHeight: "50vh",
          width: "98.9vw",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default ImageHelperCard;
