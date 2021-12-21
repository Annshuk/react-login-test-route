import {
  loginUser,
  productList,
  removeProduct,
  addProduct,
  signOut,
} from '../actions';

let user = [{ email: 'Clarion@clarion.com', password: 'Clarion123' }];

let products = [
  {
    id: 1,
    name: 'Amul',
    rate: 500,
    quality: 2,
  },
  {
    id: 2,
    name: 'Govind',
    rate: 560,
    quality: 1,
  },
  {
    id: 3,
    name: 'Krishna',
    rate: 460,
    quality: 3,
  },
];

export const getUser = () => (dispatch) => dispatch(loginUser(user));

export const getProducts = () => (dispatch) => {
  return dispatch(productList(products));
};

export const logout = () => (dispatch) => {
  return dispatch(signOut());
};

export const removeProductItem = (id) => (dispatch) => {
  products = products.filter((item) => id !== item.id);

  return dispatch(removeProduct(products));
};

export const addProductItem = (data) => (dispatch) => {
  data.id = products.length + 1;
  return dispatch(addProduct([...products, data]));
};
