import React from 'react'
import { connect } from 'react-redux'
import {
  setItemCounter,
  setBagIsOpen,
  setCurentImage,
  setOverflow
} from '../../redux/bag-reducer'
import Cart from './Cart'

class CartContainer extends React.Component {
  componentDidMount() {
    // add scrolling
    this.props.setOverflow('show')
    // close bag
    this.props.setBagIsOpen(false)
  }
  itemCountHandler = (itemId, itemCount) => {
    this.props.setItemCounter(itemId, itemCount)
  }
  currentImageHandler = (itemId, image) => {
    this.props.setCurentImage(itemId, image)
  }

  render() {
    return (
      <Cart
        items={this.props.bagItems}
        itemCountHandler={this.itemCountHandler}
        currentImageHandler={this.currentImageHandler}
        setOverflow={this.props.setOverflow}
      />
    )
  }
}

let mapStateToProps = state => {
  return {
    bagItems: state.bagReducer.bagItems
  }
}
export default connect(mapStateToProps, {
  setItemCounter,
  setBagIsOpen,
  setCurentImage,
  setOverflow
})(CartContainer)
