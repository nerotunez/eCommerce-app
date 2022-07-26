import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as AddIcon } from '../../Assets/add.svg'
import { ReactComponent as NoImageIcon } from '../../Assets/noimage.svg'
import { CurrencyContext } from '../../Context/CurrencyContext'

class Item extends React.Component {
  static contextType = CurrencyContext
  render() {
    const {
      categoryId,
      addItemInBagHandler,
      id,
      name,
      gallery,
      inStock,
      prices,
      brand,
      attributes
    } = this.props
    const currentCurrency = this.context.currentCurrency.label
    const defaultPrice = prices.filter(
      price => price.currency.label === currentCurrency
    )
    const itemImage = gallery[0]
    const itemCount = 1
    const currentImage = 0
    return (
      <Element>
        <ElementHead>
          <Link to={`/product/${categoryId}?=${id}`}>
            <ImageLayout>
              {itemImage ? <Image src={itemImage}></Image> : <NoImageIcon />}
              {!inStock && <Stock>out of stock</Stock>}
            </ImageLayout>
          </Link>
          {inStock && (
            <AddToCart
              onClick={e =>
                addItemInBagHandler({
                  e,
                  id,
                  name,
                  brand,
                  prices,
                  itemImage,
                  gallery,
                  attributes,
                  itemCount,
                  currentImage
                })
              }>
              <AddIcon />
            </AddToCart>
          )}
        </ElementHead>
        <Content>
          <Link to={`/product/${categoryId}?=${id}`}>
            <Title>{name}</Title>
          </Link>
          {defaultPrice.map(price => (
            <Price key={id}>
              {price.currency.symbol}
              {price.amount}
            </Price>
          ))}
        </Content>
      </Element>
    )
  }
}

export default Item

const Element = styled.div`
  transition: all;
  transition-duration: 300ms;
  flex: 1 0 29%;
  max-width: 386px;
  margin: 0 8px;
  padding: 1rem;
  margin-bottom: 4rem;
  position: relative;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4);
  }
`
const ElementHead = styled.div`
  position: relative;
`
const ImageLayout = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const Content = styled.div`
  margin-top: 20px;
  font-size: 18px;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  font-weight: 300;
  &:hover {
    cursor: pointer;
  }
`
const Price = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  font-weight: 500;
`
const AddToCart = styled.div`
  transition: all;
  transition-duration: 300ms;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: -26px;
  right: 1rem;
  z-index: 10;
  ${Element}:hover & {
    visibility: visible;
    opacity: 1;
    cursor: pointer;
  }
`

const Stock = styled.h2`
  font-weight: 400;
  font-size: 24px;
  color: #8d8f9a;
  background-color: #cccccc4b;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`
