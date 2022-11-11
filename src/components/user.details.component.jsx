
import { Col, Input, Modal, Row, Form, Button, message } from "antd";
import React from "react";
import { UserService } from "../services/user.service";
export function UserDetailsComponent({
  visible,
  onClose,
  datos,
  refreshData,
  setUserDetail,
}) {
  const [form] = Form.useForm();

  console.log(setUserDetail);

  const editUser = (e) => {
    UserService.updateUser(
      datos._id,
      {
        firstname: e.firstname,
        lastname: e.lastname,
        age: parseInt(e.age, 10),
      },
      (a) => {
        message.success("Se ha actualizado de forma correcta");
        setUserDetail();
        a.updateUser.age = parseInt(e.age, 10);
        a.updateUser.firstname = e.firstname;
        a.updateUser.lastname = e.lastname;
        setUserDetail(a.updateUser);
        refreshData();
        handleClose();
      },
      (e) => {
        //message.info("No se pudo actualizar, intente nuevamente");
      }
    );
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        ></span>
      </div>
      <Modal
        visible={visible}
        title="Actualizando Datos"
        footer={null}
        onCancel={onClose}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={editUser}
          onFinishFailed={() => message.error("Ops. Ha ocurrido un error!")}
          form={form}
        >
          <Form.Item
            label="Nombre"
            name="firstname"
            initialValue={datos.firstname}
            rules={[{ required: true, message: "Nombre es requerido!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="lastname"
            initialValue={datos.lastname}
            rules={[{ required: true, message: "Apellido es requerido!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Edad"
            name="age"
            initialValue={datos.age}
            type="number"
            rules={[{ required: true, message: "La edad es requerida" }]}
          >
            <Input maxLength={20} />
          </Form.Item>
          <Row justify="end">
            <Col style={{ marginInline: "5px" }}>
              <Button className="btn btn-sm btn-light" onClick={handleClose}>
                Cancel
              </Button>
            </Col>
            <Col style={{ marginInline: "5px" }}>
              <Button
                type="primary"
                className="btn btn-sm btn-primary"
                htmlType="submit"
              >
                Editar Usuario
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}