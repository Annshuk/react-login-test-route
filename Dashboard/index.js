import React from "react";
import Product from "../Products";
const Dashboard = ({
  products,
  user,
  onSignOut,
  handleDelete,
  handleAddItem,
  routProps
}) => { 
  let username = user.email && user.email.split("@")[0];
  const signOutComponent = () => {
    routProps.history.push("/")
    onSignOut()
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <p className="user-title">
            {" "}
            Hello <b>{username}</b> !
            <a href="javscript:;" onClick={e=> signOutComponent()}>
              {" "}
              Sign out
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Product
            product={products}
            handleDeleteItem={handleDelete}
            handleAddItem={handleAddItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
