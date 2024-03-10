// bottom navigation to allow user to navigate around the main pages of the app
// Adapt from React Native for the bottom navigation and icons
// https://reactnavigation.org/docs/bottom-tab-navigator/ (20 Feb 2024)
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// components
import WelcomePage from './pages/WelcomePage';
import SecurePageView from './pages/SecurePage';
import BottomTab from './components/BottomNavigation';
import SetupPassword from './components/SetUpPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={WelcomePage} options={{headerShown:false}}/>
        <Stack.Screen name='Secure' component={SecurePageView}/>
        <Stack.Screen name='Setup Password' component={SetupPassword}/>
        <Stack.Screen name='BottomTab' component={BottomTab} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
