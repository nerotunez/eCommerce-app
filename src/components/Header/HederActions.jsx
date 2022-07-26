import React, { Component } from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowIcon } from '../Assets/arrow.svg'
import { ReactComponent as CartIcon } from '../Assets/cart.svg'
import BagContainer from './Bag/BagContainer'
import Currency from './Currency/Currency'

export class HederActions extends Component {
  state = {
    isBagOpen: this.props.isBagOpen,
    isCurrencyOpen: this.props.isCurrencyOpen,
    currentCurrency: this.props.currentCurrency,
    currentUrl: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const url = window.location.href
      this.setState({
        isBagOpen: this.props.isBagOpen,
        isCurrencyOpen: this.props.isCurrencyOpen,
        currentCurrency: this.props.currentCurrency,
        currentUrl: url
      })
    }
    if(prevState.currentUrl !== this.state.currentUrl){
      if (this.state.isBagOpen) {
        this.props.setBagIsOpen(false)
        // add scrolling
        this.props.setOverflow('show')
      }
    }
  }

  bagHandle = () => {
    if (this.state.isBagOpen) {
      this.props.setBagIsOpen(false)
      // add scrolling
      this.props.setOverflow('show')
    }
    if (!this.state.isBagOpen) {
      this.props.setBagIsOpen(true)
      // remove scrolling
      this.props.setOverflow('hidden')
    }
  }
  currencyHandle = () => {
    if (this.state.isCurrencyOpen) {
      this.props.setCurrencyIsOpen(false)
    }
    if (!this.state.isCurrencyOpen) {
      this.props.setCurrencyIsOpen(true)
    }
  }
  currentCurrencyHandle = item => {
    this.props.setCurrentCurrency(item)
    this.props.setCurrencyIsOpen(false)
  }

  render() {
    const isBagEmpty = this.props.bagItems.length === 0
    const isCurrencyEmpty = this.props.currencies.length === 0
    const itemsCount =
      this.props.bagItems.length > 10 ? '10+' : this.props.bagItems.length
    return (
      <Container>
        {/* Currency */}
        <CurrencyLayout
          onMouseEnter={() => this.currencyHandle()}
          onMouseLeave={() => this.currencyHandle()}>
          <CurrencyButton disabled={isCurrencyEmpty}>
            <CurrencySymbol>{this.state.currentCurrency.symbol}</CurrencySymbol>
            {this.state.isCurrencyOpen ? (
              <ArrowIcon />
            ) : (
              <ArrowLayout>
                <ArrowIcon />
              </ArrowLayout>
            )}
          </CurrencyButton>
          {/* Currency Modal */}
          <Currency
            isOpen={this.state.isCurrencyOpen}
            items={this.props.currencies}
            currencies={this.props.currencies}
            currentCurrencyHandle={this.currentCurrencyHandle}
          />
        </CurrencyLayout>
        {/* Cart */}
        <CartLayout>
          <CartButton disabled={isBagEmpty} onClick={() => this.bagHandle()}>
            <CartIcon />
            <CartItemCount>{itemsCount}</CartItemCount>
          </CartButton>
          {/* Bag Modal */}
          <BagContainer
            isOpen={this.state.isBagOpen}
            items={this.props.bagItems}
            setItemCounter={this.props.setItemCounter}
          />
        </CartLayout>
        {this.state.isBagOpen && (
          <>
            <OutsideArea onClick={() => this.bagHandle()} />
            <BgOverlay />
          </>
        )}
      </Container>
    )
  }
}

export default HederActions

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  width: 45%;
  justify-content: flex-end;
  @media (max-width: 740px) {
    width: 100%;
    justify-content: center;
  }
`
const CurrencyLayout = styled.div`
  position: relative;
  z-index: 1000;
`
const CartLayout = styled.div``
const CurrencyButton = styled.button`
  display: flex;
  align-items: center;
  width: 38px;
  margin-left: 1.4rem;
  background: none;
  border: none;
`
const CartButton = styled.button`
  display: flex;
  margin-left: 1.4rem;
  cursor: pointer;
  background: none;
  border: none;
  position: relative;
`
const CartItemCount = styled.div`
  left: 16px;
  top: -8px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 12px;
  padding: 0 4px;
  min-height: 20px;
  font-size: 14px;
  font-weight: 700;
  background-color: #1d1f22;
  color: white;
  border-radius: 50rem;
  font-family: 'Roboto Condensed', sans-serif;
`

const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500;
  width: 34px;
`

const ArrowLayout = styled.div`
  display: flex;
  transform: rotate(0.5turn);
`

const OutsideArea = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0px;
  bottom: 0;
  z-index: 10;
`
const BgOverlay = styled.div`
  position: fixed;
  background-color: rgba(57, 55, 72, 0.22);
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 80px;
  bottom: 0;
`
