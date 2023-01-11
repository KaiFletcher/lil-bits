import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import React, { useState } from 'react'
import Header from './Header'

const DateGuests = () => {
  const data = {
    email: '',
    guests: '',
  }

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 17)
  )
  const filterPassedTime = (time) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)

    return currentDate.getTime() < selectedDate.getTime()
  }

  const [state, setState] = useState(data)
  const { email, guests } = state
  const [button, setButton] = useState(true)

  const handleChange = (event) => {
    setState({ ...state, email: event.target.value })
    if (event.target.value.length >= 5) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  const [count, setCount] = useState(1)

  const changeNumber = (i) => {
    if (count + i > 10 || count + i < 1) {
      return
    }
    setCount(count + i)
  }

  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/Receipt'
    navigate(path)
  }

  const reservation = () => {
    let order = JSON.parse(localStorage.getItem('order'))
    if (!order) {
      order = []
    }
    order.push(guests)
    order.push(startDate.toGMTString())
    order.push(email)
    localStorage.setItem('order', JSON.stringify(order))
    routeChange()
  }

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <Box>
          <TopDiv>
            <InfoTxt>
              Pick a time for pickup between Monday to Friday and hours 16:00 to
              23:00
            </InfoTxt>
            <ContainerDiv>
              <DatePicker
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat='MMMM d, yyyy h:mm aa'
                minTime={setHours(setMinutes(new Date(), 0), 17)}
                maxTime={setHours(setMinutes(new Date(), 30), 20)}
              />
            </ContainerDiv>
          </TopDiv>
          <ContainerDiv>
            <CostTxt>Number of people</CostTxt>
            <CounterContainer>
              <ArBtn onClick={() => changeNumber(-1)}>
                <Arrow
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M15 19l-7-7 7-7'></path>
                </Arrow>
              </ArBtn>
              <p>{count}</p>
              <ArBtn onClick={() => changeNumber(1)}>
                <Arrow
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M9 5l7 7-7 7'></path>
                </Arrow>
              </ArBtn>
            </CounterContainer>
            <Info
              value={email}
              type='text'
              placeholder='Enter email here'
              onChange={(event) => handleChange(event)}
            />
            <Button
              type='button'
              disabled={button}
              onClick={reservation}
            >
              Order
            </Button>
          </ContainerDiv>
        </Box>
      </ContainerDiv>
    </MainDiv>
  )
}

export default DateGuests

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #3e5f54;
  min-height: 100vh;
`

const Info = styled.input`
  height: 40px;
  width: 420px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: #d06858 solid 3px;
  color: #e3e996;
  font-size: 24px;
  background-color: #3e5f54;
  :focus {
    outline-color: #3e6053;
  }
`

const Button = styled.button`
  border: #d06858 solid;
  color: #e3e996;
  font-size: x-large;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  width: 300px;
  background-color: #3e5f54;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    color: #000000;
    background-color: #c16757;
    border: 0.1em solid #3e6053;
  }
  :disabled {
    background-color: black;
  }
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoTxt = styled.h1`
  color: #e3e996;
  margin-top: 50px;
  margin-left: 20px;
  font-size: 30px;
  margin-bottom: 40px;
`

const TopDiv = styled(ContainerDiv)`
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: #d06858 solid 2px;
  font-size: 30px;
`

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  height: 600px;
  width: 1250px;
  border: #d06858 solid;
  background-color: #3e5f54;
`

const ArBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 20px;
`

const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 80px;
`

const Arrow = styled.svg`
  height: 120px;
  cursor: pointer;
  height: 90px;
`

const CostTxt = styled.h1`
  margin-left: 15px;
  margin-bottom: 40px;
  color: #e3e996;
  font-size: 24px;
`
