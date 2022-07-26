import { client, LOAD_CATEGOIES, LOAD_CATEGORY } from "../graphql/queries"

const CATEGORIES = 'category-reducer/CATEGORIES'
const PRODUCTS = 'category-reducer/PRODUCTS'
const CURRENT_CATEGORY = 'category-reducer/CURRENT_CATEGORY'

let initialize = {
    currentCategory: '',
    categories: [],
    products: {}
}


const categoryReducer = (state = initialize, action) => {
    switch (action.type) {
        case CATEGORIES:
            return { ...state, categories: action.payload.category }
        case CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload.current }
        case PRODUCTS:
            return { ...state, products: action.payload.products }
        default:
            return state

    }
}
export const setCategories = (category) => ({ type: CATEGORIES, payload: { category } })
export const setProducts = (products) => ({ type: PRODUCTS, payload: { products } })
export const setCurrentCategory = (current) => ({ type: CURRENT_CATEGORY, payload: { current } })

export const getCategories = () => (dispatch) => {
    client
        .query({
            query: LOAD_CATEGOIES,
            fetchPolicy: 'no-cache'
        })
        .then(res => {
            dispatch(setCategories(res.data.categories))
        })
}
export const getProducts = () => (dispatch) => {
    client
        .query({
            query: LOAD_CATEGORY,
            fetchPolicy: 'no-cache'
        })
        .then(res => {
            dispatch(setProducts(res.data))
        })
}

export default categoryReducer