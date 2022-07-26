import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getProducts, setCurrentCategory } from '../../redux/category-reducer'
import { setBagItems } from '../../redux/bag-reducer'
import withParams from '../HOC/Params'
import Category from './Category'

class CategoryContainer extends React.Component {
  componentDidMount() {
    this.props.getProducts()
    let { categoryId } = this.props.params
    this.props.setCurrentCategory(categoryId ? categoryId : 'all')
  }

  addItemInBagHandler = item => {
    item.e.stopPropagation()
    // don't add item if already in bag
    const exists = this.props.bagItems.some(e => e.id === item.id)
    if (!exists) this.props.setBagItems(item)
  }

  render() {
    let { categoryId } = this.props.params
    return (
      <Category
        products={this.props.products}
        currentCategory={this.props.currentCategory}
        categoryId={categoryId ? categoryId : 'all'}
        addItemInBagHandler={this.addItemInBagHandler}
      />
    )
  }
}

let mapStateToProps = state => {
  return {
    products: state.categoryReducer.products,
    category: state.categoryReducer.category,
    bagItems: state.bagReducer.bagItems,
    currentCategory: state.categoryReducer.currentCategory
  }
}

export default compose(
  withParams,
  connect(mapStateToProps, { getProducts, setCurrentCategory, setBagItems })
)(CategoryContainer)
