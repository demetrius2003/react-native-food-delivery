import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import MainScreen from '../Screens/MainScreen'
import CategoryScreen from '../Screens/CategoryScreen';
import ItemScreen from '../Screens/ItemScreen';
import ShopCartScreen from '../Screens/ShopCartScreen';
import AuthScreen from '../Screens/AuthScreen';
import CompletedOrderScreen from '../Screens/CompletedOrder'


const defaultNavOptions = {
    headerStyle: {
      backgroundColor: '#0EC546'
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: 'white' 
  };

const Navigator = createStackNavigator({
    Main: MainScreen,
    Categories: CategoryScreen,
    Item: ItemScreen,
    ShopCart: ShopCartScreen,
    CompletedOrder: CompletedOrderScreen
},
    {defaultNavigationOptions: defaultNavOptions}
)

const MainNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Delivery: Navigator
})


export default createAppContainer(MainNavigator)