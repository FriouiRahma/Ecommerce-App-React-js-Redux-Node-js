import { FacebookShareButton, FacebookIcon } from "react-share";
import React from "react";

const SocialMediaShare = ({ url }) => {
  return (
    <div>
      <FacebookShareButton url={url} className="btn-facebook">
        <FacebookIcon size={36} />
        Partager Sur Facebook
      </FacebookShareButton>
    </div>
  );
};
export default SocialMediaShare;
