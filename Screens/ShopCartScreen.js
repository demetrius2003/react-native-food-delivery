import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {delFromShopCart, minusTotalPrice, ShopCartClear} from '../redux/actions'
import CustomHeaderButton from '../Components/HeaderButton';


const ShopCartScreen = props => {

    const userId = useSelector(state=> state.userId)

    const addOrder = async () => {

        const response = await fetch(

            'https://react-native-app-e1089-default-rtdb.firebaseio.com/orders.json',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                dishes: shopCartList,
                totalPrice: total,
                userId: userId,
                date: new Date()
            })
        }    
        )
        const clearCart = () => {
            dispatch(ShopCartClear())
        }

        clearCart()

        props.navigation.navigate({routeName: 'CompletedOrder'})
        
    }

    const shopCartList = useSelector(state=> state.shopCartList)

    const total = useSelector(state=> state.total)

    const dispatch = useDispatch()

    const removeItem = (item) => {
        dispatch(delFromShopCart(item.id))
        dispatch(minusTotalPrice(item.price))


    }
 
    const renderItem = itemData => {
        return (
            
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.price}>{itemData.item.price}</Text>
                </View>
                <Image source={{uri: itemData.item.image}}
                style={styles.image}/>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.description}>{itemData.item.description}</Text>
                    <Text style={styles.quantity}>Количество: {itemData.item.qty}</Text>
                </View>
                <View style={styles.button}>
                    <Button  title='Удалить товар'
                        onPress={() => {
                            removeItem(itemData.item);
                        }}
                    />
                </View>
            </View>
            
        )
    }

   if (shopCartList.length === 0){
    return (
        <View style={styles.empty}>
            <Text style={styles.emptyText}>Корзина пуста</Text>
            <Image source={{uri: 'https://i.pinimg.com/564x/30/84/99/308499e700e94baf9b64daceb0bdfc62.jpg'}}
            style={styles.cat}/>
            <View style={styles.emptyButton}>
            <Button title='Купить что-нибудь'
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Main'
                    })
                }}
                />
                </View>
        </View>
    )
   }else{
    return (
        <View style={styles.container}>
            <FlatList 
            data={shopCartList}
            renderItem={renderItem}/>
            <Text>Итого: {total}</Text> 
            <Button title='Заказать' onPress={addOrder}/>
        </View>
      );
   }
 
  }


  ShopCartScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Корзина'

    };
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        height: 200,
        marginBottom: 50
    },
    image: {
        width: '100%',
        height: '60%',
        marginBottom: 10,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'left'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'red'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 15,
        textAlign: 'left'
    },
    button: {
        marginTop: 10
    },
    quantity:{
        fontFamily: 'open-sans',
        fontSize: 15,
        textAlign: 'right'
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cat: {
        width: '80%',
        height: '80%',
        marginBottom: 10,
    },

    emptyText:{
        fontFamily: 'open-sans',
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    emptyButton:{
        marginTop: 10
    }
  });
  
  

  export default ShopCartScreen