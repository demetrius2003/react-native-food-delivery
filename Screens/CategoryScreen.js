import React,{useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from '../redux/actions';
import CustomHeaderButton from '../Components/HeaderButton';


const CategoryScreen = props => {
    const items = useSelector(state => state.items)
    const dispatch = useDispatch();


    const loadItems = useCallback(async () => {
      try {
          await dispatch (getItems())
      } catch(err){
          console.log(err)
      }
  },[dispatch])

  useEffect(()=>{
      loadItems()
  },[loadItems])


    const renderItem = itemData => {
        return (
            <TouchableOpacity
            onPress ={()=>{
                props.navigation.navigate({
                    routeName: 'Item',
                    params: {
                        itemId: itemData.item.id,
                        itemTitle: itemData.item.title
                    }
                })
            }}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.price}>{itemData.item.price}</Text>
                </View>
                <Image source={{uri: itemData.item.image}}
                style={styles.image}/>
                <Text style={styles.description}>{itemData.item.description}</Text>
            </View> 
            </TouchableOpacity>
        )
    }
  
    return (
        <FlatList 
        data={items}
        renderItem={renderItem}/>
      );
  }

  CategoryScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('productTitle'),
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
        height: '100%'
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
    }
  });
  

  export default CategoryScreen