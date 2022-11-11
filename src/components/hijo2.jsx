import React from "react";
import { List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Hijo2(data) {
  data = [data];

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar size="small" icon={<UserOutlined />} />}
            title={"Seleccionado ID: " + item.data._id}
            description={
              "Primer Nombre: " +
              item.data.firstname +
              " - Apellido: " +
              item.data.lastname +
              " - Edad: " +
              item.data.age
            }
          />
        </List.Item>
      )}
    />
  );
}
