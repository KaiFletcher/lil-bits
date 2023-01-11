import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  let location = useLocation()
  let path = location.pathname

  const style = {
    [path]: { color: 'red' },
  }

  return (
    <HeaderMenu>
      <Logo src='http://ih1.redbubble.net/image.181146356.8650/sticker,375x360.u1.png' />
      <Head style={style['/']}>Home</Head>
      <Head style={style['/dishes']}>Dish</Head>
      <Head style={style['/drinks']}>Drinks</Head>
      <Head style={style['/dateguests']}>Date&Guests</Head>
      <Head style={style['/receipt']}>Receipt</Head>
    </HeaderMenu>
  )
}

export default Header

const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-left: 40px;
  margin-right: 40px;
  height: 50px;
  width: 150px;
  color: #e3e996;
  background-color: #3e5f54;
  border: #d06858 solid;
  border-radius: 8px;
  font-size: x-large;
`

const Logo = styled.img`
  margin-left: 40px;
  width: 200px;
`
