import update from 'immutability-helper';
const IS_OPEN = 'bag-reducer/IS_OPEN'
const SET_BAG_ITEMS = 'bag-reducer/ITEMS'
const ITEM_COUNTER = 'bag-reducer/ITEM_COUNTER'
const SET_ITEM_SIZE = 'bag-reducer/SET_BAGITEM_SIZE'
const SET_ITEM = 'bag-reducer/SET_ITEM'
const CURRENT_ITEM_UPDATE = 'bag-reducer/CURRENT_ITEM_UPDATE'
const SET_CURRENT_URL = 'bag-reducer/SET_CURRENT_URL'
const CURRENT_IMAGE = 'bag-reducer/CURRENT_IMAGE'
const SET_OVERFLOW = 'bag-reducer/SET_OVERFLOW'


let initialize = {
    isOpen: false,
    bagItems: [
    ],
    currentItem: [],
    currentUrl: [],
    overflow: 'show'
}

const bagReducer = (state = initialize, action) => {
    switch (action.type) {
        case IS_OPEN:
            return { ...state, isOpen: action.payload.yesNo }
        case SET_OVERFLOW:
            return { ...state, overflow: action.payload.overflow }
        case SET_BAG_ITEMS:
            return {
                ...state,
                bagItems: [...state.bagItems, action.payload.items],
                currentItem: []
            }


        // update item count
        case ITEM_COUNTER:
            return update(state, {
                bagItems: {
                    [action.payload.itemId]: {
                        itemCount: { $set: action.payload.number }
                    }
                }
            });
        // update image
        case CURRENT_IMAGE:
            return update(state, {
                bagItems: {
                    [action.payload.itemId]: {
                        currentImage: { $set: action.payload.image }
                    }
                }
            });
        case SET_ITEM:
            return {
                ...state,
                currentItem: [...state.currentItem, action.payload.item],
            }
        case CURRENT_ITEM_UPDATE:
            return {
                ...state,
                currentItem: []
            }
        case SET_CURRENT_URL:
            return {
                ...state,
                currentUrl: action.payload.url
            }
        // update item count
        case SET_ITEM_SIZE:
            return update(state, {
                currentItem: {
                    0: {
                        attributes: {
                            [action.payload.sizeId]: {
                                selectedSize: { $set: action.payload.size },
                                selected: { $set: true }
                            }
                        }
                    }
                }
            });
        default:
            return state

    }
}
export const setBagIsOpen = (yesNo) => ({ type: IS_OPEN, payload: { yesNo } })
export const setOverflow = (overflow) => ({ type: SET_OVERFLOW, payload: { overflow } })
export const setBagItems = (items) => ({ type: SET_BAG_ITEMS, payload: { items } })
export const setCurrentUrl = (url) => ({ type: SET_CURRENT_URL, payload: { url } })
export const currentItemUpdate = () => ({ type: CURRENT_ITEM_UPDATE })
export const setItem = (item) => ({ type: SET_ITEM, payload: { item } })
export const setItemCounter = (itemId, number) => ({ type: ITEM_COUNTER, payload: { itemId, number } })
export const setCurentImage = (itemId, image) => ({ type: CURRENT_IMAGE, payload: { itemId, image } })
export const setItemSize = (title, id, size, sizeId) => ({ type: SET_ITEM_SIZE, payload: { title, id, size, sizeId } })



export default bagReducer