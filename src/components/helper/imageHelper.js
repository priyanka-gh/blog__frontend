import React from "react";
import { API } from "../../backend";

const imageHelper = (card) => {
  const imageurl = card
    ? `${API}/product/photo/${card.card._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div>
      <img
        alt=""
        src={imageurl}
        style={{
          maxHeight: "8rem",
          maxWidth: "13rem",
          borderRadius: "calc(var(--curve) * 1.5px)",
          objectFit: "contain",
        }}
        className="mb-1 rounded"
      />
    </div>
  );
};

export default imageHelper;
