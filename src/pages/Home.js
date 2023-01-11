import styled from 'styled-components'
import Carousel from 'react-carousel-minimal/dist/components/Carousel'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Header from './Header'

function Home() {
  const goTo = { email: '' }
  const [state, setState] = useState(goTo)
  const { email } = state

  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/Dishes'
    navigate(path)
    localStorage.clear()
  }

  const handleChange = (event) => {
    setState({ ...state, email: event.target.value })
  }

  const emailOrder = () => {
    const result = JSON.parse(localStorage.getItem('order'))
    if (result[4] === email) {
      const path = 'Receipt/'
      navigate(path)
    }
  }

  const data = [
    {
      image:
        'https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg',
      caption: `Fettuccine Alfredo`,
    },
    {
      image:
        'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg',
      caption: 'Carrot Cake',
    },
    {
      image:
        'https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg',
      caption: 'Chicken Fajita Mac and Cheese',
    },
  ]

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BigBox>
          <Carousel
            data={data}
            width='850px'
            height='344px'
            automatic={true}
            time={6000}
          />
        </BigBox>
        <SmallBox>
          <BigText>Click to order a random dish</BigText>
          <OrderButton onClick={routeChange}>ORDER</OrderButton>
        </SmallBox>
      </ContainerDiv>
      <ContainerDiv>
        <Box>
          <BigText>Find Your last order</BigText>
          <EmailLabel>ENTER EMAIL</EmailLabel>
          <EmailInput onChange={(event) => handleChange(event)}></EmailInput>
          <FindButton onClick={() => emailOrder()}>FIND</FindButton>
        </Box>
        <ImageBox
          style={{
            backgroundImage: `url(https://freepngimg.com/download/mojito/30292-8-mojito-photos.png)`,
          }}
        ></ImageBox>
      </ContainerDiv>
    </MainDiv>
  )
}

export default Home

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3e5f54;
  min-height: 105vh;
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const OrderButton = styled.button`
  border: #d06858 solid;
  color: #e3e996;
  font-size: x-large;
  border-radius: 20px;
  height: 60px;
  width: 200px;
  background-color: #3e5f54;
  margin-bottom: 25px;
  cursor: pointer;
`

const FindButton = styled(OrderButton)`
  margin-right: 50px;
  align-self: end;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 350px;
  width: 600px;
  border: #d06858 solid;
  background-color: #3e5f54;
`

const ImageBox = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 350px;
  width: 600px;
  border: #d06858 solid;
  background-color: white;
  background-size: contain;
  background-repeat: space;
  background-position: center;
`

const BigBox = styled(Box)`
  margin-top: 30px;
  width: 850px;
  height: 350px;
`

const SmallBox = styled(Box)`
  margin-top: 30px;
  width: 350px;
  align-items: center;
`

const BigText = styled.h1`
  color: #e3e996;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  font-size: 26px;
`

const EmailLabel = styled.label`
  margin-left: 20px;
  margin-bottom: -30px;
  color: #e3e996;
  font-size: 26px;
  font-weight: bold;
`

const EmailInput = styled.input`
  height: 40px;
  width: 520px;
  margin-left: 20px;
  border: #d06858 solid 3px;
  color: #e3e996;
  font-size: 24px;
  background-color: #3e5f54;
  placeholder='Enter email here'
  value={email}
  type='text'
`
