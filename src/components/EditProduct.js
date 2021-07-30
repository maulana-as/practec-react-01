import React from "react";
import { Button } from "react-bootstrap";
import { FormErrors } from "../helpers/FormErrors";

class Editproduct extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, harga_jual, harga_beli, stok, picture } =
      props.location.state.product;
    this.state = {
      id,
      name,
      harga_jual,
      harga_beli,
      stok,
      picture,
      formErrors: { name: "", harga_jual: "", harga_beli: "", stok: "" },
      nameValid: false,
      hargaJualValid: false,
      hargaBeliValid: false,
      stokValid: false,
      formValid: false,
      selectedFile: false,
      message: "",
    };
  }
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
      'image/jpg', 
      'image/jpeg',
      'image/gif',
      'image/png',
    ]
    if (format_support.indexOf(value.type) === -1) { 
      setTimeout(() => { 
        this.setState({ message: 'File tidak compatible' })
      }, 2000)
    } else if (file_size < value.size) { 
      setTimeout(() => { 
        this.setState({ message: 'Ukuran file terlalu besar' })
      }, 2000)
    } else { 
      this.setState({ picture: (value['name']) } )
      setTimeout(() => { 
        this.setState({ message: 'Sukses menambahkan gambar', selectedFile: true })
      }, 2000)
    }
  }
  
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
  
  update = (e) => {
    e.preventDefault();
    this.props.updateproductHandler(this.state);
    this.setState({ name: "", harga_jual: "" });
    this.props.history.push("/");
  };
  render() {
    const { message, selectedFile, picture } = this.state
    return (
      <div className="ui main">
        <h2>Edit product</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form className="ui form" onSubmit={this.update}>
        <div className="field">
            <label>Image</label>
            <input
              type='file'
              onChange={(event) => this.uploadImage(event.target.files[0])}
              ref={fileInput => this.fileInput = fileInput}
              required 
          />
             {picture !== '' && message !== '' && selectedFile ? <div className='textSuccess text-center mt-1' style={{ color: "blue" }}>{message}</div> : <div className='textError text-center'>{message}</div>}
          </div>
          
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
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
            <label>harga_jual</label>
            <input
              type="text"
              name="harga_jual"
              placeholder="harga_jual"
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
            <label>harga_beli</label>
            <input
              type="text"
              name="harga_beli"
              placeholder="harga_beli"
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
            <label>stok</label>
            <input
              type="text"
              name="stok"
              placeholder="stok"
              value={this.state.stok}
              onChange={this.handleFormInput}
              required
            />
          </div>
          <Button variant="primary">Update</Button>
          <Button
            variant="warning"
            onClick={() => this.props.history.goBack()}
            style={{ marginLeft: "5px" }}
          >
            Back
          </Button>
        </form>
      </div>
    );
  }
}

export default Editproduct;
