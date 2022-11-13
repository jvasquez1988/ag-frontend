import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Col, Row } from "antd";
import { UserService } from "../services/user.service";
import { message } from "antd";

import { UserDetailsComponent } from "./user.details.component";
import Hijo1 from "./hijo1";
import Hijo2 from "./hijo2";
import { NuevoUsuarioComponent } from "./nuevo.usuario";
export default function Padre() {
  const [isLoading, setIsLoading] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [pagination, setPagination] = useState({ start: 0, limit: 10 });
  const [isUserDetailVisible, setIsUserDetailVisible] = useState(false);
  const [UserDetail, setUserDetail] = useState({});
  const [isCreateUserVisible, setIsCreateUserVisible] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    setUserList([]);
    UserService.getMongoUsers(
      pagination,
      ({ Users }, res, error) => {
        //console.log(Users);
        setUserList(Users);
        setIsLoading(false);
      },
      (e) => {
        setIsLoading(false);

        //console.log(e)
        message.error("Ops. An error has ocurred!");
      }
    );
  };

  useEffect(() => {
    refreshData();
  }, [pagination]);

  const onClickRow = (data, index) => {
    setIsUserDetailVisible(true);
    setUserDetail(data);
    //console.log(UserDetail);
  };

  const onClickCreateUser = () => {
    setIsCreateUserVisible(true);
  };

  const handleOnCloseUserDetail = ({ isRestart, userData }) => {
    setIsUserDetailVisible(false);
    setUserDetail(userData);

    if (isRestart) {
      const index = UserList.findIndex((x) => x.id === userData.id);
      UserList[index] = userData;
      const newUserData = [...UserList];
      setUserList(newUserData);
    }
  };

  return (
    <div>
      <nav>
        <span>Bienvenidos a mi prueba (React + Node.js + express + Graphql + MongoDB)</span>
      </nav>
      <br />
      <Button
        type="primary"
        className="btn btn-sm btn-primary"
        onClick={onClickCreateUser}
      >
        Crear nuevo usuario
      </Button>
      {isCreateUserVisible && (
        <NuevoUsuarioComponent
          visible={isCreateUserVisible}
          onClose={() => {
            setIsCreateUserVisible(false);
          }}
          refreshData={refreshData}
          setUserDetail={setUserDetail}
        ></NuevoUsuarioComponent>
      )}
      {isUserDetailVisible && (
        <UserDetailsComponent
          visible={isUserDetailVisible}
          onClose={() => {
            setIsUserDetailVisible(false);
            handleOnCloseUserDetail();
          }}
          datos={UserDetail}
          refreshData={refreshData}
          setUserDetail={setUserDetail}
        />
      )}
      
      <Row>
        <Col span={18} push={6}>
          <div>
            <Hijo1
              onClick={onClickRow}
              x={10}
              UserList={UserList}
              isLoading={isLoading}
              setPagination={(pagination) => {
                setPagination(pagination);
              }}
              total={10}
              otro={onClickRow}
              setUserDetail={setUserDetail}
              refreshData={refreshData}
            />
          </div>
        </Col>

        <Col span={6} pull={18}>
        <div className="hijo2">
        {UserDetail.lastname && (
            <div>
              <Hijo2 data={UserDetail}></Hijo2>
            </div>
          )}          
          </div>

        </Col>
      </Row>       

    </div>
  );
}
