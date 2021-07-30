import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {addToShopCart, plusTotalPrice} from '../redux/actions'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/HeaderButton';


const ItemScreen = props => {

    const stateItems = useSelector(state => state.items)
    
    const itemId = props.navigation.getParam('itemId')

    const selectedItem = stateItems.find(item => item.id === itemId)

    const dispatch = useDispatch()

    const addToShopCartFunc = () => {
        dispatch(addToShopCart(selectedItem))
        dispatch(plusTotalPrice(selectedItem.price))
        
    }
  
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.title}>{selectedItem.title}</Text>
                <Text style={styles.price}>{selectedItem.price}</Text>
            </View>
            <Image source={{uri: selectedItem.image}}
            style={styles.image}/>
            <Text style={styles.description}>{selectedItem.description}</Text>
            <View style={styles.button}>
                <Button title='Добавить в корзину' onPress={addToShopCartFunc}/>
            </View>
        </View>
    )
 
  }

  ItemScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('itemTitle'),
      
    };
  };

  ItemScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Меню',

      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName="md-cart" onPress={() => {
                navData.navigation.navigate('ShopCart');
            }} />
        </HeaderButtons>
    )
    };
  };
  
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
  
  

  export default ItemScreen