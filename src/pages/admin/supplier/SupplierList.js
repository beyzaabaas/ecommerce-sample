import { Button, Spin, Table, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { baseService } from "../../../api/baseService";
import confirm from "antd/lib/modal/confirm";

function SupplierList() {
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    // var data = supplier.find((x) => x.id == id);
    // setSelectedData(data);
    // console.log(selectedData);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    baseService.getAll("/suppliers").then((data) => {
      setSupplier(data);
      setLoading(false);
    });
  };

  const deleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this supplier?",
      icon: <ExclamationCircleOutlined />,
      content: "Irreversible!!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        baseService.delete("/suppliers", id).then(() => {
          getData();
        });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const updateConfirm = (id) => {
    navigate("/admin/suppliers/update/" + id);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      sorter: (a, b) => a.contactName.localeCompare(b.contactName),
    },
    {
      title: "Contact Title",
      dataIndex: "contactTitle",
    },
    {
      title: "Actions",
      dataIndex: "id",
      render: (id, key) => (
        <Button onClick={() => showModal(id)} type="primary">
          Show Details
        </Button>
      ),
    },
    {
      title: "Update",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => updateConfirm(id)} type="primary" ghost>
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
      <Table columns={columns} dataSource={supplier} rowKey="id"></Table>
      <Modal
        title="Supplier"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default SupplierList;
