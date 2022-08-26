import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

// import { Header } from "antd/lib/layout/layout";

const { Header } = Layout;

function AdminHeader() {
  return (
    <>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item>
            <Link to="/admin/categories"> Category List</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/addcategory"> Add Category </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/products"> Product List </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/addproduct"> Add Product </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/suppliers"> Supplier List </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/addsupplier"> Add Supplier </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/admin/orders">Order List</Link>
          </Menu.Item>
        </Menu>
        ;
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} items={new Array(3).fill(null).map((_,index)=>({
          key:String(index+1),
          label:`nav ${index+1}`,
        }))} /> */}
      </Header>
    </>
  );
}

export default AdminHeader;
