import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import CategoryList from "./pages/admin/category/CategoryList";
import Admin from "./pages/admin/Index";
import AdminHeader from "./pages/admin/layout/AdminHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/admin/home";
import AddCategory from "./pages/admin/category/AddCategory";
import ProductList from "./pages/admin/product/ProductList";
import AddProduct from "./pages/admin/product/AddProduct";
import SupplierList from "./pages/admin/supplier/SupplierList";
import AddSupplier from "./pages/admin/supplier/AddSupplier";
import "antd/dist/antd.min.css";
import Orders from "./pages/admin/order/Order";
import AdminRoute from "./routers/AdminRoute";
import PublicRoute from "./routers/PublicRoutes";

function App() {
  return (
    <>
      {/* <Admin></Admin>
      <Layout>
        <AdminHeader></AdminHeader>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 570 }}
          >
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/categories" element={<CategoryList />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/addProduct" element={<AddProduct />} />
              <Route path="/admin/suppliers" element={<SupplierList />} />
              <Route path="/admin/addSupplier" element={<AddSupplier />} />
              <Route path="/admin/orders" element={<Orders />} />
            </Routes>
          </div>
        </Content>
      </Layout> */}
      <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<PublicRoute />} />
      </Routes>
    </>
  );
}

export default App;
