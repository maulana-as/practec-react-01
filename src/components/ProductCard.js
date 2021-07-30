import React from "react";
import { Link } from "react-router-dom";
import defaultPicture from "../images/default.png";

const ProductCard = (props) => {
  const { id, name, stok } = props.product;

  return (
    <div className="item">
      <img className="ui avatar image" src={defaultPicture} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/product/${id}`, state: { product: props.product } }}
        >
          <div className="header">{name}</div>
          <div>{stok}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(id)}
      ></i>
      <Link to={{ pathname: `/edit`, state: { product: props.product } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ProductCard;
