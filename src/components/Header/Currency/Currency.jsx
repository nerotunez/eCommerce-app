import React from 'react'
import styled from 'styled-components'

export default class Currency extends React.Component {
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
    return (
      this.props.items && (
        <>
          {this.state.isOpen && (
            <Container>
              <ContainerLayout>
                {this.props.currencies &&
                  this.props.currencies.map(item => (
                    <Element
                      key={item.label}
                      onClick={() => this.props.currentCurrencyHandle(item)}>
                      <Symbol>{item.symbol}</Symbol>
                      <Label>{item.label}</Label>
                    </Element>
                  ))}
              </ContainerLayout>
            </Container>
          )}
        </>
      )
    )
  }
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: -20px;
  padding-top: 48px;
  z-index: 1000;
`
const ContainerLayout = styled.div`
 
  min-width: 94px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  z-index: 1000;
`
const Element = styled.div`
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const Label = styled.div``
const Symbol = styled.div`
  margin-right: 0.4rem;
`
