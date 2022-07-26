import React from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { ReactComponent as PlusIcon } from '../../Assets/plus.svg'
import { ReactComponent as MinusIcon } from '../../Assets/minus.svg'
import { CurrencyContext } from '../../Context/CurrencyContext'
import { Link } from 'react-router-dom'

export default class Bag extends React.Component {
  static contextType = CurrencyContext
  state = {
    isOpen: this.props.isOpen
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        isOpen: this.props.isOpen
      })
    }
  }

  render() {
    const currentCurrency = this.context.currentCurrency.label
    const currentCurrencySymbol = this.context.currentCurrency.symbol
    const items = this.props.items
    const totalItems = items.length
    let getTotalPrice = arr => {
      let amount = []
      for (var i = 0; i < arr.length; i++) {
        const arrPrice = arr[i].prices
        for (var j = 0; j < arrPrice.length; j++) {
          if (arrPrice[j].currency.label === currentCurrency) {
            amount.push(Number(arrPrice[j].amount) * arr[i].itemCount)
          }
        }
      }
      return Number(amount.reduce((a, b) => a + b, 0).toFixed(2))
    }
    const totalPrice = getTotalPrice(items)

    return (
      this.props.items && (
        <>
          {this.state.isOpen && (
            <>
              <BagContainer>
                <Title>
                  My Bag,
                  <TotalItems>
                    {totalItems} {totalItems > 1 ? 'items' : 'item'}
                  </TotalItems>
                </Title>
                <Scrollbars style={{ height: 300 }}>
                  {items?.map((item, index) => (
                    <Layout key={item.id}>
                      <Item>
                        <Content>
                          <ContentTitle>{item.name}</ContentTitle>
                          {item.prices
                            ?.filter(
                              price => price.currency.label === currentCurrency
                            )
                            .map((price, index) => (
                              <ContentPrice key={index}>
                                {price.currency.symbol}
                                {price.amount}
                              </ContentPrice>
                            ))}
                          {item.attributes?.map(item => (
                            <SizeContainer key={item.id}>
                              {item.selected ? (
                                <SizeLayout key={item.id}>
                                  <Size>
                                    {item.items.map(e =>
                                      // if selected
                                      e.id === item.selectedSize ? (
                                        <SizeSelected
                                          key={e.id}
                                          style={
                                            item.id === 'Color'
                                              ? { background: e.value }
                                              : {}
                                          }>
                                          {item.id !== 'Color' && e.value}
                                        </SizeSelected>
                                      ) : (
                                        <SizeNotSelected
                                          key={e.id}
                                          style={
                                            item.id === 'Color'
                                              ? {
                                                  background: e.value,
                                                  border: 'none'
                                                }
                                              : {}
                                          }>
                                          {item.id !== 'Color' && e.value}
                                        </SizeNotSelected>
                                      )
                                    )}
                                  </Size>
                                </SizeLayout>
                              ) : (
                                <SizeLayout key={item.id}>
                                  <Size>
                                    {item.items.map((e, index) =>
                                      index === 0 ? (
                                        <SizeSelected
                                          key={e.id}
                                          style={
                                            item.id === 'Color'
                                              ? { background: e.value }
                                              : {}
                                          }>
                                          {item.id !== 'Color' && e.value}
                                        </SizeSelected>
                                      ) : (
                                        <SizeNotSelected
                                          key={e.id}
                                          style={
                                            item.id === 'Color'
                                              ? {
                                                  background: e.value,
                                                  border: 'none'
                                                }
                                              : {}
                                          }>
                                          {item.id !== 'Color' && e.value}
                                        </SizeNotSelected>
                                      )
                                    )}
                                  </Size>
                                </SizeLayout>
                              )}
                            </SizeContainer>
                          ))}
                        </Content>
                        <ItemRight>
                          <ItemCountLayout>
                            <ItemPlus
                              onClick={() =>
                                this.props.itemCountHandler(
                                  index,
                                  item.itemCount + 1
                                )
                              }>
                              <PlusIcon />
                            </ItemPlus>
                            <ItemCount>{item.itemCount}</ItemCount>
                            <ItemMinus
                              onClick={() =>
                                this.props.itemCountHandler(
                                  index,
                                  item.itemCount > 2 ? item.itemCount - 1 : 1
                                )
                              }>
                              <MinusIcon />
                            </ItemMinus>
                          </ItemCountLayout>
                          <ImageLayout>
                            <Image src={item.itemImage} />
                          </ImageLayout>
                        </ItemRight>
                      </Item>
                    </Layout>
                  ))}
                </Scrollbars>
                <Total>
                  Total
                  <TotalPrice>
                    {currentCurrencySymbol}
                    {totalPrice}
                  </TotalPrice>
                </Total>

                <Buttons>
                  <Link to='/cart' style={{width:'50%'}}>
                    <ViewBagButton
                      onClick={() => this.setState({ isOpen: false })}>
                      View Bag
                    </ViewBagButton>
                  </Link>
                  <CheckoutButton>Check Out</CheckoutButton>
                </Buttons>
              </BagContainer>
            </>
          )}
        </>
      )
    )
  }
}

const BagContainer = styled.div`
  background-color: white;
  position: absolute;
  width: 292px;
  top: 60px;
  right: 0;
  padding: 8px 16px 20px 16px;
  font-size: 16px;
  z-index: 100;
`
const Layout = styled.div`
  margin-bottom: 2rem;
`
const Title = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-weight: 700;
`
const TotalItems = styled.div`
  margin-left: 4px;
  font-weight: 500;
`
const Item = styled.div`
  display: flex;
  justify-content: space-between;
`
const Content = styled.div`
  width: 50%;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ContentTitle = styled.div`
  font-weight: 300;
  line-height: 1.6;
`
const ContentPrice = styled.div`
  height: 26px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-weight: 500;
`
const ItemRight = styled.div`
  height: 136px;
  width: auto;
  display: flex;
  justify-content: end;
`

const ImageLayout = styled.div`
  width: 105px;
  height: 136px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const Image = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  outline: none !important;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
const ItemCountLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 24px;
  height: 100%;
  margin: 0 10px;
`
const ItemPlusMinus = `
  cursor: pointer;
  display: flex;
  width: 8px;
  height: 8px;
  padding: 7px;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  border: 1px solid #1d1f22;
`
const ItemPlus = styled.div`
  ${ItemPlusMinus}
`
const ItemMinus = styled.div`
  ${ItemPlusMinus}
`
const ItemCount = styled.div`
  font-weight: 500;
`

const Total = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
`

const TotalPrice = styled.div``

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const ViewBagButton = styled.button`
  cursor: pointer;
  height: 44px;
  width: 100%;
  margin-right: 5px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #1d1f22;
  border-radius: 0px;
  text-transform: uppercase;
`
const CheckoutButton = styled.button`
  cursor: pointer;
  height: 44px;
  width: 50%;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 600;
  background-color: #5ece7b;
  color: white;
  text-transform: uppercase;
  border: none;
`

const SizeContainer = styled.div`
  position: relative;
`
const SizeLayout = styled.div`
  margin-top: 20px;
`
const Size = styled.div`
  display: block;
  width: 100%;
`
const SizeItem = `
  min-width: 20px;
  height: 22px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px 6px;
  font-size: 14px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  &:not(:last-child) {
    margin-right: 5px;
  }
`
const SizeSelected = styled.div`
  border: 1px solid #1d1f22;
  ${SizeItem}
`
const SizeNotSelected = styled.div`
  ${SizeItem}
  background: rgba(166, 166, 166, 0.2);
  border: 1px solid #a6a6a6;
  color: #a5a5a5;
`
