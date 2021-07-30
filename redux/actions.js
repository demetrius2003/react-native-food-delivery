import Category from "../Models/Category"
import Item from '../Models/Item'

export const addToShopCart = (payload) => ({
    type:'addToShopCart', payload : payload
})

export const plusTotalPrice = (payload) => ({
    type: 'plusTotalPrice', payload: payload
})

export const minusTotalPrice = (payload) => ({
    type: 'minusTotalPrice', payload: payload
})

export const delFromShopCart = (payload) => ({
  type: 'delFromShopCart', payload : payload
})

export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({type: 'authenticate', userId: userId, token: token})
  }
}

export const signup = (email, password) => {
  return async dispatch => {

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQksDqg5_AsG1P2LER6bB7aScPAIwGljQ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password: password,
          returnSecureToken: true
        })
      })


      if (!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        console.log(errorId)
        throw new Error(response.message)
      }

      const resData = await response.json()

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken
        )
      )
    
  }
}

export const login = (email, password) => {
  return async dispatch => {

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQksDqg5_AsG1P2LER6bB7aScPAIwGljQ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          password: password,
          returnSecureToken: true
        })
      })


      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        
        throw new Error(message);
      }

      const resData = await response.json()

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken
        )
      )
    
  }
}

export const getCategories = () => {
  return async (dispatch, getState) => {
    // const userId =getState().userId;
    // const token =getState().token;
    try {

      const response = await fetch(
        `https://react-native-app-e1089-default-rtdb.firebaseio.com/category.json`
      )

      if(!response.status){
        throw new Error('Error')
      }

      const resData = await response.json()
      
      

      const loadedCategories = []

      for(const key in resData){
        loadedCategories.push(
          new Category(
            key,
            resData[key].title,
            resData[key].imageUrl
          )
        )
      }

    
    dispatch({
      type:'getCategories',
      categories: loadedCategories
})
}

catch(err) {
  throw err;
}
  }}


  export const getItems = () => {
    return async (dispatch, getState) => {
      // const userId =getState().userId;
      // const token =getState().token;
      try {
  
        const response = await fetch(
          `https://react-native-app-e1089-default-rtdb.firebaseio.com/category/-Mf3kBsXMAcAPUMybx47/items.json`
        )
  
        if(!response.status){
          throw new Error('Error')
        }
  
        const resDataItem = await response.json()
        
        
        const loadedItems = []

        for(const key in resDataItem){
          for(const k in resDataItem[key]){
            // console.log(resDataItem[key][k])
            loadedItems.push(
            new Item(
              k,
              'c1',
              resDataItem[key][k].title,
              resDataItem[key][k].imageUrl,
              resDataItem[key][k].description,
              resDataItem[key][k].price
            )
          )}
        }

        // console.log(loadedItems)
        // const loadedItems = [
        //   new Item(1, 'c1','Карбонара', "https://cdn.pixabay.com/photo/2018/11/10/00/38/pasta-3805772_960_720.jpg", "Спагетти с беконом", 500),
        //   new Item(2, 'c1', "Пицца", "https://cdn.pixabay.com/photo/2020/06/08/16/49/pizza-5275191_960_720.jpg", 'Пицца маргаритта', 600),
        //   new Item(3, 'c1', 'Тирамису', "https://cdn.pixabay.com/photo/2018/04/08/21/13/dessert-3302502_960_720.jpg", "Сливочно-кофейный десерт", 400)
        // ]
      dispatch({
        type:'getItems',
        items: loadedItems
  })
  }
  
  catch(err) {
    throw err;
  }
    }}
