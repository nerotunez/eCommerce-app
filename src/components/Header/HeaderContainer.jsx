import React from 'react'
import { connect } from 'react-redux'
import { getCategories, setCurrentCategory } from '../../redux/category-reducer'
import GlobalStyle from '../../theme/GlobalStyles'
import {
  setCurrencyIsOpen,
  getCurrencies,
  setCurrentCurrency
} from '../../redux/currency-reducer'
import {
  setOverflow,
  setBagIsOpen,
  setItemCounter
} from '../../redux/bag-reducer'
import Header from './Header'
import { compose } from 'redux'
import withParams from '../HOC/Params'

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getCurrencies()
  }

  currentCategoryHandle = current => {
    this.props.setCurrentCategory(current)
  }

  render() {
    return (
      <>
        <GlobalStyle overflow={this.props.overflow} />
        <Header
          isCurrencyOpen={this.props.isCurrencyOpen}
          setCurrencyIsOpen={this.props.setCurrencyIsOpen}
          setCurrentCurrency={this.props.setCurrentCurrency}
          currencies={this.props.currencies}
          currentCurrency={this.props.currentCurrency}
          setBagIsOpen={this.props.setBagIsOpen}
          isBagOpen={this.props.isBagOpen}
          bagItems={this.props.bagItems}
          categories={this.props.categories}
          currentCategory={this.props.currentCategory}
          currentCategoryHandle={this.currentCategoryHandle}
          setItemCounter={this.props.setItemCounter}
          setOverflow={this.props.setOverflow}
        />
      </>
    )
  }
}

let mapStateToProps = state => {
  return {
    isBagOpen: state.bagReducer.isOpen,
    isCurrencyOpen: state.currencyReducer.isOpen,
    bagItems: state.bagReducer.bagItems,
    categories: state.categoryReducer.categories,
    currencies: state.currencyReducer.currencies,
    currentCurrency: state.currencyReducer.currentCurrency,
    currentCategory: state.categoryReducer.currentCategory,
    overflow: state.bagReducer.overflow
  }
}

export default compose(
  withParams,
  connect(mapStateToProps, {
    setBagIsOpen,
    setCurrencyIsOpen,
    setCurrentCurrency,
    getCategories,
    getCurrencies,
    setCurrentCategory,
    setItemCounter,
    setOverflow
  })
)(HeaderContainer)
