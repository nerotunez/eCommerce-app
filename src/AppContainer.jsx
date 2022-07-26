import React from 'react'
import { connect } from 'react-redux'
import App from './App'
import { CurrencyContext } from './components/Context/CurrencyContext'

class AppContainer extends React.Component {
  render() {
    return (
      <CurrencyContext.Provider value={{currentCurrency:this.props.currentCurrency}}>
        <App />
      </CurrencyContext.Provider>
    )
  }
}

let mapStateToProps = state => {
  return {
    currentCurrency: state.currencyReducer.currentCurrency
  }
}

export default connect(mapStateToProps, {})(AppContainer)
