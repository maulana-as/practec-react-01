import React, { Component } from "react";
import { FormErrors } from "../helpers/FormErrors";

class AddProduct extends Component {
  state = {
    name: "",
    harga_jual: "",
    harga_beli: "",
    stok: "",
    formErrors: { name: "", harga_jual: "", harga_beli: "", stok: "" },
    nameValid: false,
    hargaJualValid: false,
    hargaBeliValid: false,
    stokValid: false,
    formValid: false,
    picture: "",
    message: "",
    selectedFile: false,
  };

  handleFormInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  uploadImage = async (value) => {
    const file_size = 500 * 1024;
    const format_support = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    if (format_support.indexOf(value.type) === -1) {
      setTimeout(() => {
        this.setState({ message: "File tidak compatible" });
      }, 2000);
    } else if (file_size < value.size) {
      setTimeout(() => {
        this.setState({ message: "Ukuran file terlalu besar" });
      }, 2000);
    } else {
      this.setState({ picture: value });
      setTimeout(() => {
        this.setState({
          message: "Sukses menambahkan gambar",
          selectedFile: true,
        });
      }, 2000);
    }
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let hargaJualValid = this.state.hargaJualValid;
    let hargaBeliValid = this.state.hargaBeliValid;
    let stokValid = this.state.stokValid;

    switch (fieldName) {
      case "harga_jual":
        let toNumber = Number(value);
        hargaJualValid = toNumber > 0;
        fieldValidationErrors.harga_jual = hargaJualValid
          ? ""
          : "tidak boleh kurang kurang dari nol";
        break;
      case "harga_beli":
        let toNumberHargaBeli = Number(value);
        hargaBeliValid = toNumberHargaBeli > 0;
        fieldValidationErrors.harga_jual = hargaBeliValid
          ? ""
          : "tidak boleh kurang dari 0";
        break;
      case "stok":
        let toNumberStok = Number(value);
        stokValid = toNumberStok > 0;
        fieldValidationErrors.stok = stokValid
          ? ""
          : "tidak boleh kurang dari 0";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        hargaJualValid: hargaJualValid,
        hargaBeliValid: hargaBeliValid,
        stokValid: stokValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.hargaJualValid &&
        this.state.hargaBeliValid &&
        this.state.stokValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  add = (e) => {
    e.preventDefault();
    this.props.AddProductHandler(this.state);
    this.setState({
      name: "",
      harga_jual: "",
      harga_beli: "",
      stok: "",
      picture: "",
    });
    this.props.history.push("/");
  };

  render() {
    const { message, selectedFile, picture } = this.state;
    return (
      <div className="ui main">
        <h2>Tambahkan Produk</h2>
        <div className="panel panel-default">
          <FormErrors
            formErrors={this.state.formErrors}
            style={{ color: "red" }}
          />
        </div>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Image</label>
            <input
              type="file"
              onChange={(event) => this.uploadImage(event.target.files[0])}
              ref={(fileInput) => (this.fileInput = fileInput)}
              required
            />
            {picture !== "" && message !== "" && selectedFile ? (
              <div
                className="textSuccess text-center mt-1"
                style={{ color: "blue" }}
              >
                {message}
              </div>
            ) : (
              <div className="textError text-center">{message}</div>
            )}
          </div>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Sabun Colek"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.harga_jual
            )}`}
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            <label>Harga Jual</label>
            <input
              type="number"
              name="harga_jual"
              placeholder="ex: 30000"
              value={this.state.harga_jual}
              onChange={this.handleFormInput}
              required
            />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.harga_beli
            )}`}
          >
            <label>Harga Beli</label>
            <input
              type="number"
              name="harga_beli"
              min="0"
              placeholder="ex: 29000"
              value={this.state.harga_beli}
              onChange={this.handleFormInput}
              required
            />
          </div>
          <div
            className={`form-group ${this.errorClass(
              this.state.formErrors.stok
            )}`}
            style={{ marginBottom: "10px", marginTop: "10px" }}
          >
            <label>Stok</label>
            <input
              type="number"
              name="stok"
              placeholder="ex: 20"
              min="0"
              value={this.state.stok}
              onChange={this.handleFormInput}
              required
            />
          </div>
          <button className="ui blue button">Add</button>
          <button
            className="ui yellow button"
            onClick={() => this.props.history.goBack()}
          >
            Back
          </button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
