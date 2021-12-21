import React, { PureComponent } from "react";
import Modal from '../Modal';
import "./styles";
class Product extends PureComponent {
  constructor() {
    super();
    this.state = {
      products: [],
      show: false
    };
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = (data) => {
    this.setState({ show: false });
  };

  handleAddClick = (e) => {
    this.showModal()
  }

  addItemFromModal = (data) => {
   this.props.handleAddItem(data)
  }

  handleClick = (e, item) => {
     e.preventDefault();
     this.props.handleDeleteItem(item.id);    
     this.setState({products: this.props.product.products});     
  }

  render() {   
    const { products } = this.props.product;  
    return (      
      <div className="col-10"> 
      <h5 className="title"> Product List</h5>     
        {products.length === 0 && (
          <p className="no-items">
            There is no Item to Display. Click on "ADD PRODUCT" button to add
            items
          </p>
        )}        
        <ul className="productList">
          {this.props.product &&
            products.map((item, index) => {
              return (
                <li key={item.name + index}>
                  <span><b>{item.name}</b> </span>
                  <span><b>Rate:</b> {item.rate} </span>
                  <span><b>Quality</b> : {item.quality} </span>
                  <span>
                    <a
                      href="#"
                      onClick={e => this.handleClick(e, item)}
                    >
                      Delete
                    </a>
                  </span>
                </li>
              );
            })}
        </ul>
        <button onClick={(e) => this.handleAddClick(e)}>Add Item</button>
         {this.state.show && <Modal 
         showModal = {this.showModal} 
         closeModal = {this.hideModal}
         addItemData= {this.addItemFromModal} />}
      </div>
    );
  }
}

export default Product;
