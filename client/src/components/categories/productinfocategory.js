import React from "react";
import { connect } from "react-redux";
import data from "../../utils/default.json";

export const productinfocategory = ({ products, match }) => {
  const produc = products.filter((el) => el._id === match.params.id);
  const currproduct = produc[0];
  console.log("currproduct", currproduct);

  return (
    <div>
      <div className='productinfo'>
        <div className='name'> {currproduct && currproduct !== null && currproduct.name} </div>
        {currproduct && currproduct !== null && (
          <img src={`${data.backUrl}/uploads/${currproduct.photo}`} alt='' />
        )}
        <div className='price'> {currproduct && currproduct !== null && currproduct.price} </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.produits.listprod,
  };
};

export default connect(mapStateToProps)(productinfocategory);
