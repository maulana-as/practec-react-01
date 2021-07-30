import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuid_v4 } from "uuid";
import swal from 'sweetalert'
import api from "./api/products";
import "./App.css";
import { Header, AddProduct, ProductList, ProductDetail, EditProduct } from './components'

function App() {
  const [products, setproducts] = useState([]);

  const retrieveProducts = async () => {
    const response = await api.get("/products");
    return response.data;
  };

  const AddProductHandler = async (product) => {
    const payload = {
      id: uuid_v4(),
      name: product.name,
      harga_jual: product.harga_jual,
      harga_beli: product.harga_beli,
      stok: product.stok,
      picture: product.picture['name']
    };

    const response = await api.post("/products", payload);
    setproducts([...products, response.data]);
  };

  const updateproductHandler = async (product) => {
    const response = await api.put(`/products/${product.id}`, product);
    const { id  } = response.data;
    setproducts(
      products.map((product) => {
        return product.id === id ? { ...response.data } : product;
      })
    );
  };

  const removeProductHandler = async (id) => {
    await api.delete(`/products/${id}`);
    const newProductList = products.filter((product) => {
      return product.id !== id;
    });
    swal({
      title: 'Are you sure?',
      text: 'Data will be deleted permanently',
      icon: 'warning',
      dangerMode: true,
    }).then(() => {
      setproducts(newProductList);
      swal('Data deleted successfully', {
        icon: 'success',
        button: true,
        timer: 1000
      })
    })
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveProducts();
      if (allProducts) setproducts(allProducts);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    
  }, [products]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ProductList
                {...props}
                products={products}
                getProdukId={removeProductHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddProduct {...props} AddProductHandler={AddProductHandler} />
            )}
          />

          <Route
            path="/edit"
            render={(props) => (
              <EditProduct
                {...props}
                updateproductHandler={updateproductHandler}
              />
            )}
          />

          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
