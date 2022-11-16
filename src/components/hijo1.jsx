import React, { useState } from "react";
import { Table, Button, Avatar, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserService } from "../services/user.service";

export default function Hijo1(
  UserList,
  x,
  onClick,
  isLoading,
  setPagination,
  total,
  otro,
  setUserDetail,
  refreshData
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //console.log(UserList);
  onClick = UserList.onClick;
  refreshData = UserList.refreshData;
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


  const disabledUser = (id) => {
    setLoading(true);

    UserService.deleteUser(
      id,
      (a) => {
        message.success("Borrado con exito");
        setUserDetail(a);
        refreshData();
        setLoading(false);
      },
      (e) => {
        //message.error("Por favor intente más tarde");
        refreshData();
        setLoading(false);
      }
    );
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
          <table>
            <tbody>
              <tr>
                <td>
                  <Button
                    className="btn  btn-sm btn-danger"
                    style={{
                      color: "red",
                      alignItems: "center",
                      display: "flex",
                    }}
                    title="Editar"
                    onClick={() => {
                      //console.log("Actuando con undefined");
                      onClick && onClick(item, index);
                    }}
                  >
                    <Avatar size="small" icon={<EditOutlined />} />
                  </Button>
                </td>
                <td>
                  <Button
                    title="Borrar"
                    onClick={() => disabledUser(item._id)}
                    className="btn  btn-sm btn-danger"
                  >
                    <DeleteOutlined />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
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
