// bottom navigation to allow user to navigate around the main pages of the app
// Adapt from React Native for the bottom navigation and icons
// https://reactnavigation.org/docs/bottom-tab-navigator/ (20 Feb 2024)
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={HomePage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='home' color={color} size={size}/>
            )
          }} 
        />
        <Tab.Screen 
          name='Calendar' 
          component={CalendarPage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='calendar-month' color={color} size={size} />
            )
          }} 
        />
        <Tab.Screen 
          name='Profile' 
          component={ProfilePage} 
          options={{
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='account-circle' color={color} size={size} />
            )
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
