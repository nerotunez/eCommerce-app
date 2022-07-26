import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withParams from '../HOC/Params'
import Product from './Product'
import { getProduct, setDefaultImageurl } from '../../redux/product-reducer'
import { setCurrentCategory } from '../../redux/category-reducer'
import {
  setBagItems,
  setItemSize,
  setItem,
  currentItemUpdate,
  setCurrentUrl
} from '../../redux/bag-reducer'

class ProductContainer extends React.Component {
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    const url = window.location.href
    this.props.setCurrentUrl(url)
    // extract productId
    const productId = url.split('=')[1]
    const { categoryId } = this.props.params
    this.props.getProduct(productId)
    // set current category
    this.props.setCurrentCategory(categoryId)
  }

  componentDidUpdate(prevState) {
    // clear current selected item if page changed
    if (prevState.currentUrl !== this.props.currentUrl) {
      this.props.currentItemUpdate()
    }
  }

  addItemInBagHandler = item => {
    // don't add item if already in bag
    const exists = this.props.bagItems.some(e => e.id === item.id)
    if (!exists) {
      if (this.props.currentItem?.length > 0) {
        this.props.setBagItems(this.props.currentItem[0])
      } else {
        this.props.setBagItems(item)
      }
    }
  }
  itemSizeHandler = (item, title, id, size, sizeId) => {
    // don't edit item if already in bag
    const exists = this.props.bagItems.some(e => e.id === item.id)
    if (!exists) {
      this.props.setItem(item)
      this.props.setItemSize(title, id, size, sizeId)
    }
  }

  defaultImageHandler = imageUrl => {
    this.props.setDefaultImageurl(imageUrl)
  }

  render() {
    return (
      <Product
        product={this.props.product.product}
        defaultImageHandler={this.defaultImageHandler}
        defaultImageurl={this.props.defaultImageurl}
        addItemInBagHandler={this.addItemInBagHandler}
        itemSizeHandler={this.itemSizeHandler}
        bagItems={this.props.bagItems}
      />
    )
  }
}

let mapStateToProps = state => {
  return {
    product: state.productReducer.product,
    defaultImageurl: state.productReducer.defaultImageurl,
    bagItems: state.bagReducer.bagItems,
    currentItem: state.bagReducer.currentItem,
    currentUrl: state.bagReducer.currentUrl
  }
}

export default compose(
  withParams,
  connect(mapStateToProps, {
    getProduct,
    setCurrentCategory,
    setDefaultImageurl,
    setBagItems,
    setItemSize,
    setItem,
    currentItemUpdate,
    setCurrentUrl
  })
)(ProductContainer)
