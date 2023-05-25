// import { useLocation, Link } from "react-router-dom";

// // ...

// const Posted = () => {
//   const location = useLocation();
//   const { createdBlogUrl } = location.state;

//   return (
//     <div>
//       <h2>Posted Successfully!</h2>
//       {createdBlogUrl && (
//         <div>
//           <p>Link to the created blog:</p>
//           <Link to={createdBlogUrl}>{createdBlogUrl}</Link>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Posted;

import React from "react";
import "./updated.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { API } from "../../backend";

const Posted = () => {
  const location = useLocation();
  const { createdBlogUrl } = location.state;
  const baseUrl = window.location.origin;
  const link = `${baseUrl}${createdBlogUrl}`;
  return (
    <div className="posted">
      <h2 className="h1Posted">POSTED SUCCESSFULLY!!</h2>
      <CopyToClipboard text={link}>
        <button>Copy URL</button>
      </CopyToClipboard>
    </div>
  );
};

export default Posted;
