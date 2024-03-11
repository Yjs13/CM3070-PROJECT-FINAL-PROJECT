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
import Authentication from './components/Authentication';
import ForgetPass from './components/ForgetPassword';
import AboutUsPage from './pages/AboutUsPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={WelcomePage} options={{headerShown:false}}/>
        <Stack.Screen name='Secure' component={SecurePageView} options={{headerTitle:'Secure Page'}}/>
        <Stack.Screen name='Setup Password' component={SetupPassword} options={{headerTintColor: '#800080',headerStyle: {backgroundColor: '#fbeed7'}}}/>
        <Stack.Screen name='Authentication' component={Authentication}/>
        <Stack.Screen name='Forget Password' component={ForgetPass} options={{headerTintColor: '#800080',headerStyle: {backgroundColor: '#fbeed7'}}}/>
        <Stack.Screen name='About Us' component={AboutUsPage} options={{headerTintColor: '#800080',headerStyle: {backgroundColor: '#fbeed7'}}}/>
        <Stack.Screen name='BottomTab' component={BottomTab} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
