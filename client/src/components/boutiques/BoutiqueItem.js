import { React } from "react";

const BoutiqueItem = (props) => {
  return (
    <div>
      <h1>{props.boutique.name}</h1>
      <h1>{props.boutique.website}</h1>
    </div>
  );
};

export default BoutiqueItem;
