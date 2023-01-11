import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from './Header'

const Receipt = () => {
  const [finishOrder, setFinishOrder] = useState([])
  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/'
    navigate(path)
  }

  const getReceipt = async () => {
    const result = await JSON.parse(localStorage.getItem('order'))
    setFinishOrder(result)
  }

  useEffect(() => {
    getReceipt()
  }, [])

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <Box>
          <RcpTxt>RECEIPT</RcpTxt>
          <ItmTxt>Dish: {finishOrder[0]}</ItmTxt>
          <ItmTxt>Beverage: {finishOrder[1]}</ItmTxt>
          <ItmTxt>Guests: {finishOrder[2]}</ItmTxt>
          <ItmTxt>Date: {finishOrder[3]}</ItmTxt>
          <ItmTxt>Email: {finishOrder[4]}</ItmTxt>
        </Box>
        <BoxButton onClick={routeChange}>BACK TO HOME</BoxButton>
      </ContainerDiv>
    </MainDiv>
  )
}

export default Receipt

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3e5f54;
  min-height: 100vh;
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 35%;
`

const BoxButton = styled.button`
  border: #d06858 solid;
  color: #e3e996;
  font-size: x-large;
  border-radius: 20px;
  height: 50px;
  width: 300px;
  background-color: #3e5f54;
  margin-bottom: 25px;
  cursor: pointer;
  align-self: center;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 40px;
  min-height: 600px;
  width: 400px;
  border: #d06858 solid;
  border-radius: 5px;
  background-color: #3e5f54;
`

const RcpTxt = styled.p`
  margin-left: 10px;
  color: #e3e996;
  font-size: 30px;
  font-weight: 500;
`

const ItmTxt = styled(RcpTxt)`
  font-size: 20px;
  font-weight: normal;
`
