import React,{useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { getCategories } from '../redux/actions';
import CustomHeaderButton from '../Components/HeaderButton';

const MainScreen = props => {
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();


    const loadCategories = useCallback(async () => {
        try {
          await dispatch (getCategories())
        } catch(err){
            console.log(err.message)
        }
    },[dispatch])

    useEffect(()=>{
        loadCategories()
    },[loadCategories])

    const renderCategory = itemData => {
        return (
            <TouchableOpacity
            onPress ={()=>{
                props.navigation.navigate({
                    routeName: 'Categories',
                    params: {
                        categoryId: itemData.item.id,
                        productTitle: itemData.item.title
                    }
                }) 
            }}>
            <View style={styles.container}>
                <Text style={styles.title}>{itemData.item.title}</Text>
                <Image source={{uri: itemData.item.image}}
                style={styles.image}/>
            </View>
            </TouchableOpacity>
        )
    }
  
    return (

      <FlatList 
      data={categories}
      renderItem={renderCategory}/>
      
    );
  }

  MainScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Главное меню',
      
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Cart" iconName="md-cart" onPress={() => {
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
      height: 150
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'center'
      },
    image: {
        width: '100%',
        height: '100%'
    }
  });
  

  export default MainScreen