import Category from "../Models/Category"

export const addToShopCart = (payload) => ({
    type:'addToShopCart', payload : payload
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

