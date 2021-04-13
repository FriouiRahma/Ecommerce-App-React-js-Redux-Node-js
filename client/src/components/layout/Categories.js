import React from "react";
import { connect } from "react-redux";
const Categories = ({ categories }) => {
  const cat = categories.map((cat) => <div key={cat._id}>{cat.name}</div>);

  console.log(cat);

  return (
    <div>
      Categories List
      <ul>{cat}</ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});
export default connect(mapStateToProps)(Categories);
