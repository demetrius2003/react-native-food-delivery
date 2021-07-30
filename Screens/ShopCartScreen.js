import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {delFromShopCart, minusTotalPrice} from '../redux/actions'


const ShopCartScreen = props => {

    const userId = useSelector(state=> state.userId)

    const addOrder = async () => {

        const response = await fetch(

            'https://react-native-app-e1089-default-rtdb.firebaseio.com/orfers.json',
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
    }

    const shopCartList = useSelector(state=> state.shopCartList)

    const total = useSelector(state=> state.total)

    // const stateItems = useSelector(state => state.items)
    
    // const itemId = props.navigation.getParam('itemId')

    // const deleteItem = stateItems.find(item => item.id === itemId)

    const dispatch = useDispatch()

    const removeItem = (item) => {
        console.log(item)
        dispatch(delFromShopCart(item.id))
        dispatch(minusTotalPrice(i.price))


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
                <Text style={styles.description}>{itemData.item.description}</Text>
                <Button title='Удалить товар'
                    onPress={() => {
                        removeItem(itemData.item);
                      }}
                />
            </View>
            
        )
    }

   
  
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
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        height: 150,
        marginBottom: 50
    },
    image: {
        width: '100%',
        height: '50%'
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
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
  });
  
  

  export default ShopCartScreen