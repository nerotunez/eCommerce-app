import React, { Component } from 'react'
import styled from 'styled-components'
import { ReactComponent as MinusIcon } from '../Assets/minus.svg'
import { ReactComponent as PlusIcon } from '../Assets/plus.svg'
import { ReactComponent as ArrowRightIcon } from '../Assets/arrowRight.svg'
import { ReactComponent as ArrowLeftIcon } from '../Assets/arrowLeft.svg'
import { CurrencyContext } from '../Context/CurrencyContext'

export default class Cart extends Component {
  static contextType = CurrencyContext

  // set current image
  imageHandler = (type, itemIndex, imageCount) => {
    const lastItem =
      this.props.items?.[itemIndex].gallery.length - 1 ===
      this.props.items?.[itemIndex].currentImage
    const firstItem = this.props.items?.[itemIndex].currentImage === 0
    if (type === 'next' && !lastItem) {
      this.props.currentImageHandler(itemIndex, imageCount + 1)
    }
    if (type === 'before' && !firstItem) {
      this.props.currentImageHandler(itemIndex, imageCount - 1)
    }
  }

  render() {
    const currentCurrency = this.context.currentCurrency.label
    const currentCurrencySymbol = this.context.currentCurrency.symbol
    const items = this.props.items
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
      <>
        <BagContainer>
          <Title>Cart</Title>
          {items?.map((item, index) => (
            <Layout key={item.id}>
              <Item>
                <Content>
                  <ContentTitle>{item.name}</ContentTitle>
                  {item.prices
                    ?.filter(price => price.currency.label === currentCurrency)
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
                          <SizeTitle>{item.id}</SizeTitle>
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
                          <SizeTitle>{item.id}</SizeTitle>
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
                        this.props.itemCountHandler(index, item.itemCount + 1)
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
                    <Image src={item.gallery[item.currentImage]} />
                    <ImageCarousel>
                      {item.currentImage !== 0 && (
                        <ImageBefore
                          onClick={() =>
                            this.imageHandler(
                              'before',
                              index,
                              item.currentImage
                            )
                          }>
                          <ArrowLeftIcon />
                        </ImageBefore>
                      )}
                      {item.gallery.length - 1 !== item.currentImage && (
                        <ImageNext
                          onClick={() =>
                            this.imageHandler('next', index, item.currentImage)
                          }>
                          <ArrowRightIcon />
                        </ImageNext>
                      )}
                    </ImageCarousel>
                  </ImageLayout>
                </ItemRight>
              </Item>
            </Layout>
          ))}
          <Total>
            Total
            <TotalPrice>
              {currentCurrencySymbol}
              {totalPrice}
            </TotalPrice>
          </Total>
        </BagContainer>
      </>
    )
  }
}

const BagContainer = styled.div`
  margin: 80px 0;
  background-color: white;
  top: 60px;
  right: 0;
  padding: 8px 16px 20px 16px;
  font-size: 16px;
  z-index: 1;
`
const Layout = styled.div`
  margin-bottom: 2rem;
`
const Title = styled.div`
  display: flex;
  margin-bottom: 60px;
  font-size: 32px;
  font-weight: 700;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
`
const Content = styled.div`
  width: 50%;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ContentTitle = styled.div`
  font-size: 30px;
  font-weight: 300;
  line-height: 1.6;
`
const ContentPrice = styled.div`
  height: 26px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  font-weight: 700;
  font-size: 24px;
`
const ItemRight = styled.div`
  height: 180px;
  width: auto;
  display: flex;
  justify-content: end;
`

const ImageLayout = styled.div`
  position: relative;
  width: 140px;
  height: 180px;
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
const ImageCarousel = styled.div`
  height: 24px;
  width: 100%;
  position: absolute;
`
const ImageNext = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #22222255;
`
const ImageBefore = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #22222255;
`

const ItemCountLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 48px;
  height: 100%;
  margin: 0 10px;
`
const ItemPlusMinus = `
  cursor: pointer;
  display: flex;
  width: 15px;
  height: 15px;
  padding: 15px;
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
  font-size: 24px;
  font-weight: 500;
`

const Total = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
  font-weight: 700;
`

const TotalPrice = styled.div``

const SizeContainer = styled.div`
  position: relative;
`
const SizeLayout = styled.div`
  margin-top: 20px;
`
const SizeTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
`
const Size = styled.div`
  display: block;
  width: 100%;
`
const SizeItem = `
  min-width: 54px;
  height: 44px;
  line-height: 42px;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px 6px;
  font-size: 16px;
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
