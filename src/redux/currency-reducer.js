import { client, LOAD_CURRENCIES } from "../graphql/queries"

const IS_OPEN = 'currency-reducer/IS_OPEN'
const CURRENCIES = 'currency-reducer/CURRENCIES'
const CURRENT_CURRENCY = 'currency-reducer/CURRENT_CURRENCY'

let initialize = {
    isOpen: false,
    currencies: [],
    currentCurrency: {},
}


const currencyReducer = (state = initialize, action) => {
    switch (action.type) {
        case IS_OPEN:
            return { ...state, isOpen: action.payload.yesNo }
        case CURRENCIES:
            return { ...state, currencies: action.payload.currency }
        case CURRENT_CURRENCY:
            return { ...state, currentCurrency: action.payload.currentCurrency }
        default:
            return state

    }
}
export const setCurrencyIsOpen = (yesNo) => ({ type: IS_OPEN, payload: { yesNo } })
export const setCurrencies = (currency) => ({ type: CURRENCIES, payload: { currency } })
export const setCurrentCurrency = (currentCurrency) => ({ type: CURRENT_CURRENCY, payload: { currentCurrency } })

export const getCurrencies = () => (dispatch) => {
    client
        .query({
            query: LOAD_CURRENCIES,
            fetchPolicy: 'no-cache'
        })
        .then(res => {
            dispatch(setCurrentCurrency(res.data.currencies[0]))
            dispatch(setCurrencies(res.data.currencies))
        })
}


export default currencyReducer