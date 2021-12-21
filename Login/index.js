import { connect } from "react-redux";
import { getUser, getProducts } from "../services";
import LoginForm from "./Components";

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    getProducts: () => dispatch(getProducts())
  };
};
const mapStateToProps = state => ({
  loginData: state.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
