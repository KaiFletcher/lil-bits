import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Header'

const Loading = () => <p>Loading...</p>

const Dishes = () => {
  const [loading, setLoading] = useState()
  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/Drinks'
    navigate(path)
  }

  let dishPrice = 2500

  const [dish, setDish] = useState([])

  const getDish = async () => {
    const res = await fetch('https://themealdb.com/api/json/v1/1/random.php')
    const body = await res.json()
    setDish(body.meals[0])
  }

  const reservation = () => {
    let order = JSON.parse(localStorage.getItem('order'))
    if (!order) {
      order = []
    }
    order.push(dish.strMeal)
    localStorage.setItem('order', JSON.stringify(order))
    routeChange()
    setLoading(false)
  }

  useEffect(() => {
    getDish()
  }, [])

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <StackDiv>
          {dish && <BoxedImg src={dish.strMealThumb} />}
          <BigBox>
            <ColumnItems>
              <RowItems>
                {loading && <Loading />}
                {dish && <HeadTxt>{dish.strMeal}kr</HeadTxt>}
                <HeadTxt>{dishPrice}kr</HeadTxt>
              </RowItems>
              {dish && <p>{dish.strInstructions}</p>}
            </ColumnItems>
          </BigBox>
        </StackDiv>
        <ColumnItems>
          <SmallBox>
            <LargeTxt>
              If you are happy with the random dish, click on `Choose dish`
            </LargeTxt>
            <BoxButton onClick={reservation}>Choose Dish</BoxButton>
            <BoxButton onClick={getDish}>Generate new</BoxButton>
          </SmallBox>
        </ColumnItems>
      </ContainerDiv>
    </MainDiv>
  )
}

export default Dishes

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3e5f54;
  min-height: 100vh;
  color: #e3e996;
`

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  width: 90%;
`

const ColumnItems = styled.div`
  display: flex;
  flex-direction: column;
`

const RowItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const HeadTxt = styled.h1`
  margin-left: 10px;
  margin-right: 20px;
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
  width: 30%;
  border: #d06858 solid;
  background-color: #3e5f54;
`

const StackDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const BigBox = styled(Box)`
  margin-top: 10px;
  width: 650px;
`

const SmallBox = styled(Box)`
  flex-direction: column;
  height: 300px;
  width: 350px;
  justify-content: space-between;
`

const LargeTxt = styled.h1`
  color: #e3e996;
  margin-left: 20px;
  margin-right: 20px;
  font-size: x-large;
`

const BoxedImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  height: 300px;
  width: 650px;
  background-color: #3e5f54;
  border: #d06858 solid;
`
