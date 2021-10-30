import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default () => (
  <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to={`/`}>Home</Link>        
      </Menu.Item>
      <Menu.Item key="2"><a href="/users/edit">Edit Profile</a> </Menu.Item>
      <Menu.Item key="3"><a href="/reports">Reports</a></Menu.Item>
      <Menu.Item key="4"><a href="/users/sign_out">Logout</a></Menu.Item>
    </Menu>
  </Header>
);