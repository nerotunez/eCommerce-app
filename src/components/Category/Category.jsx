import React from 'react'
import styled from 'styled-components'
import Item from './Item/Item'

class Category extends React.Component {
  render() {
    const { categoryId, products, addItemInBagHandler, currentCategory } =
      this.props
    const productsList = products.category?.products.filter(e =>
      categoryId === 'all' ? e.category : e.category === categoryId
    )
    return (
      <Container>
        <Title>{currentCategory}</Title>
        <ItemContainer>
          {productsList &&
            productsList?.map(
              ({
                id,
                name,
                gallery,
                inStock,
                prices,
                description,
                brand,
                attributes
              }) => (
                <Item
                  key={id}
                  id={id}
                  name={name}
                  gallery={gallery}
                  inStock={inStock}
                  prices={prices}
                  description={description}
                  brand={brand}
                  attributes={attributes}
                  categoryId={categoryId}
                  addItemInBagHandler={addItemInBagHandler}
                />
              )
            )}
        </ItemContainer>
      </Container>
    )
  }
}

export default Category

const Container = styled.div`
  padding: 4rem 0;
`
const Title = styled.h1`
  font-weight: 300;
  font-size: 2.6rem;
  margin-bottom: 4rem;
  text-transform: capitalize;
`
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
