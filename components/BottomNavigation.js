// bottom navigation to allow user to navigate around the main pages of the app
// Adapt from React Native for the bottom navigation and icons
// https://reactnavigation.org/docs/bottom-tab-navigator/ (20 Feb 2024)
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// main pages
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

const BottomTab = () =>{
  return (
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: {backgroundColor: '#fbeed7' },
        }}
      >
        <Tab.Screen 
          name='Home' 
          component={HomePage} 
          options={{headerShown: false,
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='home' color={'#800080'} size={size}/>
            )
          }} 
        />
        <Tab.Screen 
          name='Calendar' 
          component={CalendarPage} 
          options={{headerShown: false,
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='calendar-month' color={'#800080'} size={size} />
            )
          }} 
        />
        <Tab.Screen 
          name='Profile' 
          component={ProfilePage} 
          options={{headerShown: false,
            tabBarIcon: ({ color, size }) => (
              // default size and color
              <MaterialCommunityIcons name='account-circle' color={'#800080'} size={size} />
            )
          }} 
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    
});

export default BottomTab;
