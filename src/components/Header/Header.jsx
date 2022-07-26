import React from 'react'
import styled from 'styled-components'
import HeaderLogo from './HeaderLogo'
import HeaderNavigation from './HeaderNavigation'
import HederActions from './HederActions'

class Header extends React.Component {
  render() {
    return (
      <Container>
        <HeaderNavigation
          categories={this.props.categories}
          currentCategory={this.props.currentCategory}
          currentCategoryHandle={this.props.currentCategoryHandle}
        />
        <HeaderLogo />
        <HederActions
          setBagIsOpen={this.props.setBagIsOpen}
          setCurrencyIsOpen={this.props.setCurrencyIsOpen}
          isBagOpen={this.props.isBagOpen}
          isCurrencyOpen={this.props.isCurrencyOpen}
          bagItems={this.props.bagItems}
          currencies={this.props.currencies}
          currentCurrency={this.props.currentCurrency}
          setCurrentCurrency={this.props.setCurrentCurrency}
          setItemCounter={this.props.setItemCounter}
          setOverflow={this.props.setOverflow}
        />
      </Container>
    )
  }
}

export default Header

const Container = styled.div`
  height: 80px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: white;
  flex-direction: row;
  @media (max-width: 740px) {
    min-height: 200px;
    flex-direction: column;
  }
`
