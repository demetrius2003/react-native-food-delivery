
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

            if (state.shopCartList.some(item => item.id === action.payload.id)) {
                return{
                    ...state,
                    shopCartList: [...state.shopCartList.map(item => (item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item))]
                    }  
            }else{
                action.payload['qty']= 1
                return{
                    ...state,
                    shopCartList: [...state.shopCartList,action.payload]
                    }
            }

        case 'delFromShopCart':
            return{
                ...state,
                shopCartList: state.shopCartList
                    .map(item => (item.id === action.payload ? { ...item, qty: item.qty - 1 } : item))
                    .filter(item => item.qty > 0)}

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
            }
        case 'ShopCartClear':
            return{
                ...state,
                shopCartList: [],
                total: 0
            }

        default:
            return state
    }
}

export default reducer
