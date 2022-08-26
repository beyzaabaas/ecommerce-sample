import { Button, Spin, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { baseService } from "../../../api/baseService";
import confirm from "antd/lib/modal/confirm";
import { useNavigate } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  // const deleteCategory = (id) => {
  //   console.log("ID", id);
  //   baseService.delete("/categories", id).then(() => {
  //     getData();
  //   });
  // };

  // CALL API
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    baseService.getAll("/categories").then((data) => {
      setCategories(data);
      setLoading(false);
    });
  };

  //Delete category with modal
  const deleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      content: "Irreversible!!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        baseService.delete("/categories", id).then(() => {
          getData();
        });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // UPDATE
  const goToUpdatePage = (id) => {
    navigate("/admin/categories/update/" + id);
  };
  // COLUMNS
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Update",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => goToUpdatePage(id)} type="primary" ghost>
          Update
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => deleteConfirm(id)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}></Spin>
      <Table columns={columns} dataSource={categories} rowKey="id"></Table>
    </>
  );
}

export default CategoryList;
