import { Layout } from "antd";
import React, {useState} from "react";
import Timesheets from "./Timesheets";
import Header from "./Header";
import axios from "axios";
import styled from 'styled-components'

const { Content, Footer } = Layout;

const ClockInCheckOutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const ClockInCheckOutBtnStyle = styled.button`
  color: #fff;
  background: #333;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  width: 96%;
  margin-top: 20px;
  border 1px solid #333;
  
  &:hover {
    background: #1890ff;
    color: #000;
    border: 1px solid #fff;
  }

`

const ClockInCheckOutBtn = (props) => {
  const [clockIn, setClockIn] = useState(false)

  function clockInClick(){
    let url = `/api/v1/timesheets/clock_in`
    if(clockIn){
      url = `/api/v1/timesheets/clock_out`
    }
    console.log("Loading timesheets")

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post(url)
    .then(resp => {
      setClockIn(resp.data.clock_in)
    })
    .catch(resp => {
      alert(resp.response.data.error)
      setClockIn(false)
    })
  }
  return(    
    <ClockInCheckOutBtnStyle onClick={clockInClick}>{ clockIn ? "Clock Out" : "Clock in" }</ClockInCheckOutBtnStyle>    
  )
}

const Home = (props) => {

  return(
    <Layout className="layout">
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <ClockInCheckOutWrapper> 
          <ClockInCheckOutBtn />
        </ClockInCheckOutWrapper>      
        <div className="site-layout-content" style={{ margin: "100px auto" }}>
          <h1>Timesheets</h1>
          <Timesheets />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Timesheet Management ©2021.</Footer>
  </Layout>

  )
}

export default Home