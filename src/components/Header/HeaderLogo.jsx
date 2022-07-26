import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../Assets/logo.svg'

const Image = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  @media (max-width: 740px) {
    width: 100%;
  }
`

export class HeaderLogo extends React.Component {
  render() {
    return (
      <Image>
        <Logo />
      </Image>
    )
  }
}

export default HeaderLogo
