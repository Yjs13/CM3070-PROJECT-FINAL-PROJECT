// bottom navigation to allow user to navigate around the main pages of the app
// Adapt from React Native for the bottom navigation and icons
// https://reactnavigation.org/docs/bottom-tab-navigator/ (20 Feb 2024)
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// components
import WelcomePage from './pages/WelcomePage';
import BottomTab from './components/BottomNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomTab'>
        <Stack.Screen name='Welcome' component={WelcomePage} options={{headerShown:false}}/>
        <Stack.Screen name='BottomTab' component={BottomTab} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
