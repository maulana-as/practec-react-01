import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductList = (props) => {

  const deleteProdukHandler = (id) => {
    const idProduk = props.getProdukId(id);
    return idProduk
  }

  const renderproductList = props.products.map((product) => {
    return (
      <ProductCard
        product={product}
        clickHander={deleteProdukHandler}
        key={product.id}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        Daftar Produk
        <Link to="/add">
          <button className="ui button blue right">Add Product</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderproductList}</div>
    </div>
  );
};

export default ProductList;
