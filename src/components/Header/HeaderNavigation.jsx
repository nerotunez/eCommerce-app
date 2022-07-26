import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class HeaderNavigation extends React.Component {
  render() {
    const { categories, currentCategory, currentCategoryHandle } = this.props
    return (
      <Navigation>
        {categories &&
          categories.map((category, index) => (
            <Element key={index}>
              {category.name === currentCategory ? (
                <>
                  <Label onClick={() => currentCategoryHandle(category.name)}>
                    <TextGreen>{category.name}</TextGreen>
                  </Label>
                  <Border />
                </>
              ) : (
                <Link to={`category/${category.name}`}>
                  <Label onClick={() => currentCategoryHandle(category.name)}>
                    <Text>{category.name}</Text>
                  </Label>
                </Link>
              )}
            </Element>
          ))}
      </Navigation>
    )
  }
}

export default HeaderNavigation

const Navigation = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  top: 12px;
  position: relative;
  /* min-width: 234px; */
  width: 45%;
  height: 56px;
  left: 0px;
  bottom: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  z-index: 100;
`

const Element = styled.div`
  height: 56px;
  position: relative;
`
const Label = styled.div`
  background-color: #ffffff;
  height: 52px;
  padding: 4px 16px 0 16px;
  display: flex;
`
const Text = styled.div`
  height: 20px;
  white-space: nowrap;
  color: #000;
  text-transform: uppercase;
`
const TextGreen = styled.div`
  height: 20px;
  white-space: nowrap;
  font-weight: bold;
  color: #40b14f;
  text-transform: uppercase;
`
const Border = styled.div`
  background-color: #40b14f;
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: 0px;
`
