import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const Drinks = () => {
  const navigate = useNavigate()

  const routeChange = () => {
    const path = '/DateGuests'
    navigate(path)
  }

  const [drink, setDrink] = useState([])

  const pickDrink = async () => {
    const result = await axios.get('https://api.punkapi.com/v2/beers')
    setDrink(result.data)
  }

  const [selected, setSelected] = useState([])

  const handleChange = (event) => {
    const { checked, value } = event.currentTarget

    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    )
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

  useEffect(() => {
    pickDrink()
  }, [])

  return (
    <MainDiv>
      <Header />
      <ContainerDiv>
        <BigBox>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <Box sx={{ height: '590px', overflow: 'scroll', width: '600px' }}>
                {drink.map((drink) => (
                  <Paper
                    sx={{
                      maxWidth: 400,
                      my: 1,
                      mx: 'auto',
                      p: 2,
                      backgroundColor: '#3e6053',
                    }}
                    key={drink.id}
                  >
                    <Grid
                      container
                      wrap='nowrap'
                      spacing={2}
                    >
                      <Grid item>
                        <Avatar>
                          <Image src={drink.image_url} />
                        </Avatar>
                      </Grid>
                      <Grid
                        item
                        xs
                        zeroMinWidth
                      >
                        <Typography noWrap>
                          <label htmlFor={drink.id}>{drink.name} 650kr.</label>
                          <input
                            checked={selected.some((val) => val === drink.name)}
                            onChange={handleChange}
                            value={drink.name}
                            id={drink.id}
                            type='checkbox'
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
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

const LilBox = styled.div`
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

const BigBox = styled(LilBox)`
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

const Image = styled.img`
  height: 50px;
`
