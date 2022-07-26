import { client, LOAD_PRODUCT } from "../graphql/queries"

const PRODUCT = 'product-reducer/PRODUCTS'
const DEFAULT_IMAGE_URL = 'product-reducer/DEFAULT_IMAGE_URL'

let initialize = {
    product: {},
    defaultImageurl: ''
}

const productReducer = (state = initialize, action) => {
    switch (action.type) {
        case PRODUCT:
            return { ...state, product: action.payload.product }
        case DEFAULT_IMAGE_URL:
            return { ...state, defaultImageurl: action.payload.imageUrl }

        default:
            return state

    }
}
export const setProduct = (product) => ({ type: PRODUCT, payload: { product } })
export const setDefaultImageurl = (imageUrl) => ({ type: DEFAULT_IMAGE_URL, payload: { imageUrl } })


export const getProduct = (productId) => (dispatch) => {
    client
        .query({
            query: LOAD_PRODUCT,
            variables: {
                "id": productId
            },
            fetchPolicy: 'no-cache'
        })
        .then(res => {
            dispatch(setProduct(res.data))
        })
}


export default productReducer