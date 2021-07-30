import React from "react";
import { Link } from "react-router-dom";
import user from "../images/default.png";

const ProductDetail = (props) => {
  const { name, stok } = props.location.state.product;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="stock">{stok}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to product List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
