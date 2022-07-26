import React, { Component } from 'react'
import styled from 'styled-components'
import { CurrencyContext } from '../Context/CurrencyContext'
import parse from 'html-react-parser'

export default class Product extends Component {
  static contextType = CurrencyContext
  state = {
    isImageChanged: false,
    defaultImage: this.props.defaultImageurl,
    selectedSizes: []
  }
  changeDefaultImage = event => {
    this.props.defaultImageHandler(event.target.src)
    this.setState({
      isImageChanged: true
    })
  }

  addItemToBag = () => {
    const { id, name, brand, prices, attributes, gallery } = this.props.product
    const itemImage = this.props.product.gallery[0]
    const itemCount = 1
    const currentImage = 0
    this.props.addItemInBagHandler({
      id,
      name,
      brand,
      prices,
      gallery,
      itemImage,
      currentImage,
      attributes,
      itemCount
    })
  }
  chooseItemSize = (title, itemId, size, sizeId) => {
    // add slected size
    if (this.state.selectedSizes.length > 0) {
      const isSame = this.state.selectedSizes.some(e => e.title === title)
      if (isSame) {
        const index = this.state.selectedSizes.findIndex(e => e.title === title)
        //remove item with same title
        this.state.selectedSizes.splice(index, 1)
      }
    }
    const selected = {
      title: title,
      value: size
    }
    this.setState({
      selectedSizes: [...this.state.selectedSizes, selected]
    })

    const { id, name, brand, prices, attributes, gallery } = this.props.product
    const itemImage = this.props.product.gallery[0]
    const itemCount = 1
    const currentImage = 0
    this.props.itemSizeHandler(
      {
        id,
        name,
        brand,
        prices,
        itemImage,
        attributes,
        itemCount,
        gallery,
        currentImage
      },
      title,
      itemId,
      size,
      sizeId
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        defaultImage: this.props.defaultImageurl
      })
    }
  }

  render() {
    const currentCurrency = this.context.currentCurrency.label
    const product = this.props.product
    const itemIndex = this.props.bagItems.map(
      e => e.id === product?.id && e.name
    )
    const currentItemIndex = itemIndex.indexOf(product?.name)
    const mainImageUrl = product?.gallery.at(0)
    const defaultPrice = product?.prices.filter(
      price => price.currency.label === currentCurrency
    )

    return (
      <>
        {product && (
          <Container>
            <ImagesContainer>
              <ImagesList>
                {product.gallery.map((imageUrl, index) => (
                  <ImageLayout
                    style={
                      this.state.defaultImage === imageUrl
                        ? { border: '1px solid #1d1f22' }
                        : {}
                    }
                    key={index}
                    onClick={e => this.changeDefaultImage(e)}>
                    <Image src={imageUrl} />
                  </ImageLayout>
                ))}
              </ImagesList>
              <MainImageContainer>
                <MainImage
                  src={
                    this.state.isImageChanged
                      ? this.state.defaultImage
                      : mainImageUrl
                  }
                />
              </MainImageContainer>
            </ImagesContainer>
            <Content>
              <Brand>{product.brand}</Brand>
              <Title>{product.name}</Title>
              {product?.attributes.map((item, index) => (
                <SizeLayout key={item.id}>
                  <SizeTitle>{item.name}</SizeTitle>
                  <Size>
                    {item.items.map(e => (
                      <div key={e.displayValue}>
                        {this.state.selectedSizes.length > 0 ? (
                          <>
                            {this.state.selectedSizes?.some(
                              selectedItem =>
                                selectedItem.title === item.id &&
                                selectedItem.value === e.displayValue
                            ) ? (
                              <SizeItemSelected
                                onClick={() => {
                                  this.chooseItemSize(
                                    item.id,
                                    currentItemIndex,
                                    e.displayValue,
                                    index
                                  )
                                }}
                                key={e.id}
                                style={
                                  item.id === 'Color'
                                    ? { background: e.value }
                                    : {}
                                }>
                                {item.id !== 'Color' && e.value}
                              </SizeItemSelected>
                            ) : (
                              <SizeItem
                                onClick={() => {
                                  this.chooseItemSize(
                                    item.id,
                                    currentItemIndex,
                                    e.displayValue,
                                    index
                                  )
                                }}
                                key={e.id}
                                style={
                                  item.id === 'Color'
                                    ? { background: e.value }
                                    : {}
                                }>
                                {item.id !== 'Color' && e.value}
                              </SizeItem>
                            )}
                          </>
                        ) : (
                          <SizeItem
                            onClick={() => {
                              this.chooseItemSize(
                                item.id,
                                currentItemIndex,
                                e.displayValue,
                                index
                              )
                            }}
                            key={e.id}
                            style={
                              item.id === 'Color'
                                ? {
                                    background: e.value,
                                    border: '1px solid tranparent'
                                  }
                                : {}
                            }>
                            {item.id !== 'Color' && e.value}
                          </SizeItem>
                        )}
                      </div>
                    ))}
                  </Size>
                </SizeLayout>
              ))}

              <PriceTitle>price</PriceTitle>
              {defaultPrice.map((price, index) => (
                <Price key={index}>
                  {price.currency.symbol}
                  {price.amount}
                </Price>
              ))}
              {product?.inStock && (
                <AddButton onClick={() => this.addItemToBag()}>
                  add to cart
                </AddButton>
              )}

              <Description>{parse(product?.description)}</Description>
            </Content>
          </Container>
        )}
      </>
    )
  }
}

const Container = styled.div`
  display: flex;
  margin: 80px 0;
  flex-direction: row;
  justify-content: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`
const ImagesContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  @media (max-width: 900px) {
    min-width: 200px;
  }
`
const MainImageContainer = styled.div`
  display: flex;
  width: 100%;
`
const MainImage = styled.img`
  max-width: 610px;
  /* height: 100%; */
  object-fit: contain;
  width: 100%;
  /* padding: 0 4rem; */
  @media (max-width: 900px) {
    padding: 0;
  }
`
const ImagesList = styled.div`
  width: 150px;
`
const ImageLayout = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid transparent;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`
const Image = styled.img`
  width: auto;
  height: 80px;
  object-fit: cover;
`
const Content = styled.div`
  width: 292px;
`
const Brand = styled.div`
  font-size: 27px;
  font-weight: 600;
  margin-bottom: 16px;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 42px;
`

const SizeLayout = styled.div`
  margin: 2rem 0;
`

const Size = styled.div`
  display: flex;
`
const SizeTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
`

const SizeItem = styled.div`
  cursor: pointer;
  width: 62px;
  height: 44px;
  font-size: 16px;
  border: 1px solid #1d1f22;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  &:not(:last-child) {
    margin-right: 10px;
  }
`
const SizeItemSelected = styled.div`
  cursor: pointer;
  width: 62px;
  height: 44px;
  font-size: 16px;
  border: 1px solid #5ece7b;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const PriceTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
`
const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
`
const Description = styled.div`
  margin-top: 40px;
`
const AddButton = styled.button`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 100%;
  height: 52px;
  background-color: #5ece7b;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`
