import React, { PureComponent } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
let product = {};
class ModalExample extends PureComponent {
  constructor() {
    super();
    this.state = {
      name: "",
      rate: "",
      quality: "",
      error: false,
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = () => {
    if (this.state.rate && this.state.name && this.state.quality) {
      if (
        /^[0-9]*$/.test(this.state.rate) &&
        /^(.*[A-Z].*)$/.test(this.state.name)
      ) {
        product.name = this.state.name;
        product.rate = this.state.rate;
        product.quality = this.state.quality;
        this.props.addItemData(product);
        this.props.closeModal();
        this.setState({error: false})
      }
    } else {
      this.setState({ error: true });
    }
    return false;
  };

  render() {
    const { showModal, closeModal } = this.props;
    return (
      <>
        <Modal isOpen={showModal}>
          <ModalHeader>Add Product</ModalHeader>
          <ModalBody>
            <Form autoComplete="off" onSubmit={this.onSubmit}>
              {this.state.error && (
                <span className="has-error">
                  {" "}
                  Fields have an error
                </span>
              )}
              <FormGroup>
                <Label for="exampleEmail">Product's Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                  placeholder="Product Name (First char should be Capital)"
                />
              </FormGroup>
              <FormGroup>
                <Label for="productRate">Rate</Label>
                <Input
                  type="text"
                  name="rate"
                  required
                  value={this.state.rate}
                  onChange={e => this.handleInputChange(e)}
                  placeholder="Rate (Only number allow)"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleUrl">Quality</Label>
                <Input
                  type="select"
                  name="quality"
                  onChange={e => this.handleInputChange(e)}
                >
                  <option value="">--Select--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <input
              type="submit"
              color="primary"
              onClick={this.onSubmit}
              value="Add Item"
            />{" "}
            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default ModalExample;
