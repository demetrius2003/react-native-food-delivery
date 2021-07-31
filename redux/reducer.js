
const initialState = {
    shopCartList: [],
    categories: [],
    items: [],
    token: null,
    userId:null,
    total: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'addToShopCart':
            return {
                ...state,
                shopCartList: [...state.shopCartList,action.payload]
            };

        case 'delFromShopCart':
            const delIndex = state.shopCartList.findIndex(index => index.id === action.payload)
            return{
                ...state,
                shopCartList: [...state.shopCartList.filter((_, i) => i !== delIndex)]
            }

        case 'plusTotalPrice':
            return {
                ...state,
                total: state.total += action.payload
            }

        case 'minusTotalPrice':
            return {
                ...state,
                total: state.total -= action.payload
            }

        case 'getCategories':
            return{
                ...state,
                categories: action.categories
            }
        case 'getItems':
            return{
                ...state,
                items: action.items
            }
        case 'authenticate':
            return {
                ...state,
                token: action.token,
                userId: action.userId
            };
        default:
            return state
    }
}

export default reducer
