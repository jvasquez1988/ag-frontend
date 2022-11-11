import React, { useState } from "react";
import { Table, Button, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function Hijo1(
  UserList,
  x,
  onClick,
  isLoading,
  setPagination,
  total,
  otro
) {
  const [currentPage, setCurrentPage] = useState(1);

  //console.log(UserList);
  onClick = UserList.onClick;

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    const newPagination = {
      start: pagination.pageSize * (pagination.current - 1),
      limit: pagination.pageSize,
    };
    setPagination(newPagination);
  };

  const pagination = {
    current: currentPage,
    total: total,
  };

  const columnas = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: "5%",
      render: ({ item, index }) => {
        return (
          <Button
            className="btn  btn-sm btn-danger"
            style={{ color: "red", alignItems: "center", display: "flex" }}
            title="Editar"
            onClick={() => {
              //console.log("Actuando con undefined");
              onClick && onClick(item, index);
            }}
          >
            <Avatar size="small" icon={<EditOutlined />} />
          </Button>
        );
      },
    },
    {
      title: "Primer Nombre",
      dataIndex: "firstname",
      key: "firstname",
      align: "center",
      width: "20%",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      align: "center",
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
  ];

  const info = UserList.UserList?.map((item, index) => {
    return {
      ...item,
      key: item?._id,
      action: { item, index },
      firstname: item?.firstname || "None",
      lastname: item?.lastname || "None",
      age: item?.age || "0",
    };
  });
  return (
    <Table
      loading={isLoading || false}
      dataSource={info}
      columns={columnas}
      pagination={pagination}
      scroll={{ x: true }}
      onChange={handleTableChange}
    />
  );
}
