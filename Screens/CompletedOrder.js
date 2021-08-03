import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../Components/HeaderButton';


const CompletedOrderScreen = props => {
    
  
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Заказ совершен</Text>
            <View style={styles.Button}>
            <Button title='На главную'
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'Main'
                    })
                }}
                />
                </View>
        </View>
    )
 
  }
  CompletedOrderScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Заказ совершен',

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
        alignItems: 'center',
        justifyContent: 'center',
    },

    Text:{
        fontFamily: 'open-sans',
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    Button:{
        marginTop: 10
    }
})
  

  export default CompletedOrderScreen