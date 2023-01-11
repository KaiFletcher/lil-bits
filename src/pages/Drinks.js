import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'

let drinkArray = []
let itemID = 0

const Drinks = () => {
  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/DateGuests'
    navigate(path)
  }

  const [drink, setDrink] = useState([])

  const pickDrink = async () => {
    const result = await fetch('https://api.punkapi.com/v2/beers')
    const body = await result.json()
    setSelected(body)
  }

  const [selected, setSelected] = useState([])

  const handleChange = (cost, name, setID) => {
    drinkArray.push({ n: name, c: cost, id: itemID })
    itemID++
    if (drink[setID] === undefined) {
      setDrink({
        ...drink,
        [setID]: !drink[setID],
      })
    }
  }

  const reservation = () => {
    let order = JSON.parse(localStorage.getItem('order'))
    if (!order) {
      order = []
    }
    order.push(selected)
    localStorage.setItem('order', JSON.stringify(order))
    setDrink(null)
    routeChange()
  }

  let drinkValue = 450
  let drinkCost = Array.from({ length: 30 }, () => (drinkValue += 50))

  useEffect(() => {
    drinkArray = []
    pickDrink()
  }, [])

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BigBox>
          {selected ? (
            selected.map((item) => (
              <CardDiv
                key={item.id}
                style={{ backgroundImage: `url(${item.image_url})` }}
                onClick={() =>
                  handleChange(drinkCost[item.id - 1], item.name, item.id)
                }
              >
                <p>{drinkCost[item.id - 1]}kr</p>
                {drink[item.id] && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <CheckMark
                      fillRule='evenodd'
                      d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                <DrinkNames>{item.name}</DrinkNames>
              </CardDiv>
            ))
          ) : (
            <p>Something went wrong</p>
          )}
        </BigBox>
        <SmallBox>
          <LargeTxt>Click to finish ordering</LargeTxt>
          <BoxButton onClick={reservation}>Next</BoxButton>
        </SmallBox>
      </ContainerDiv>
    </MainDiv>
  )
}

export default Drinks

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3e5f54;
  min-height: 100vh;
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-left: 10px;
  margin-right: 10px;
  width: 600px;
  border: #d06858 solid;
  background-color: #3e5f54;
`

const BigBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content;
  padding: 10px;
`

const SmallBox = styled(Box)`
  flex-direction: column;
  height: 350px;
  width: 350px;
  justify-content: space-between;
  padding: 10px;
`

const LargeTxt = styled.h1`
  color: #e3e996;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 40px;
`

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  width: 250px;
  margin: 10px;
  border: #d06858 solid 4px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  color: #e3e996;
`

const DrinkNames = styled.p`
  margin: 0px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #e3e996;
`

const CheckMark = styled.path`
  height: 100px;
  width: 100px;
  color: #e3e996;
`
