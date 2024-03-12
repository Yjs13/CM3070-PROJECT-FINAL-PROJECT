// Home Page where it allows user to add, view, edit and sort tasks
// adapt from Github by Adel Reda
// https://github.com/AdelRedaa97/react-native-select-dropdown (22 Feb 2024)
// Adapt from 2024 React Native Community
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';

// components
import EditTaskForm from '../components/EditTaskForm';
import AddTaskForm from '../components/AddTaskForm';
import CheckList from '../components/Checklist';
import Authentication from '../components/Authentication';
import SortingTask from '../components/SortingTask';

// Home Page of the task manager application
function HomeScreen(){
  // to set the visibility of the add task pop up form
  const [formVisible, setFormVisible] = useState(false);
  // to set the edit pop-up form visibility state
  const [editFormVisible, setEditFormVisible] = useState(false);
  // to set the selected task information for user to modify
  const [editFormInfo, setEditFormInfo] = useState([]);
  // to set the the index of the checklist task thats need to be modified
  const [editIndex, setEditIndex] = useState('');
  //to set the value of the 'Title' textInput
  const [titleText, setTitleText] = useState('');
  //to set the value of the whole checklist, an array of value
  const [checkList, setCheckList] = useState([]);
  // to set the visibility for each individual checkBox tick
  const [tickVisible, setTickVisible] = useState([]);
  // to set the value of the 'Priority' input
  const [priority, setPriority] = useState('');
  // to set the value of the 'Timeframe' input
  const [timeFrame, setTimeFrame] = useState('');
  // to set the due date of the task
  // due date button text that display the calendar date
  const [mainDueDate, setMainDueDate] = useState(new Date());
  // to set the description
  const [descpText, setDescpText] = useState('');
  // to set all task information
  const [taskAllInfo, setTaskAllInfo] = useState([]);

  // priority data
  const priorities = ['High', 'Medium', 'Low']
  // timeframe data
  const timeFrames = ['30m', '1h', '2h', '3h','5h', '8h', '1d']

  // loads the saved checklist everytime the user opens the app
  useEffect(()=> {
    const getSavedCheckList = async () => {
      try {
          const savedCheckListData = await AsyncStorage.getItem('checklist');
          const savedTickData = await AsyncStorage.getItem('ticks');
          const savedAllTaskData = await AsyncStorage.getItem('taskInfo');
          if (savedCheckListData) 
          {
            const parsedListData = JSON.parse(savedCheckListData);
            setCheckList(parsedListData);
            const parsedTickData = JSON.parse(savedTickData);
            setTickVisible(parsedTickData);
            const parsedAllTaskData = JSON.parse(savedAllTaskData);
            setTaskAllInfo(parsedAllTaskData);
          }
      } catch (error) {
          console.error('Error in retrieving the saved checklist data:', error);
      }
    };

    getSavedCheckList();
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView>
        <View 
          style={styles.homePageView} 
          accessible={true} 
          accessibilityLabel='Home Page View'
        >
          <SortingTask 
            checkList={checkList} 
            setCheckList={setCheckList}
          />
          {/* tasks checklist added by the user container*/}
          <CheckList 
            tickVisible={tickVisible}
            setTickVisible={setTickVisible}
            setEditFormVisible={setEditFormVisible}
            setEditFormInfo={setEditFormInfo}
            setEditIndex={setEditIndex}
            setTitleText={setTitleText}
            setPriority={setPriority}
            checkList={checkList}
            setMainDueDate={setMainDueDate}
            taskAllInfo={taskAllInfo}
            setTimeFrame={setTimeFrame}
            setDescpText={setDescpText}
          />

          {/* add tasks feature */}
          <View>
              {/* add task pop-up form */}
              <AddTaskForm 
                formVisible={formVisible} 
                setFormVisible={setFormVisible} 
                titleText={titleText} 
                setTitleText={setTitleText}
                priority={priority}
                setPriority={setPriority}
                priorities={priorities}
                setCheckList={setCheckList}
                setTickVisible={setTickVisible}
                setMainDueDate={setMainDueDate}
              />
          </View>

          {/* pop-up form to enable the user to edit the task */}
          <EditTaskForm 
            editFormVisible={editFormVisible} 
            setEditFormVisible={setEditFormVisible} 
            titleText={titleText} 
            setTitleText={setTitleText}
            priority={priority}
            setPriority={setPriority}
            priorities={priorities}
            editFormInfo={editFormInfo}
            checkList={checkList}
            editIndex={editIndex}
            mainDueDate={mainDueDate}
            setMainDueDate={setMainDueDate}
            timeFrames={timeFrames}
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            taskAllInfo={taskAllInfo}
            descpText={descpText}
            setDescpText={setDescpText}
            tickVisible={tickVisible}
          />
        </View>
      </ScrollView>
      {/* add task button to show the pop up form */}
      <Pressable
        accessible={true}
        accessibilityLabel='Add Task Button'
        onPress={()=> setFormVisible(true)}
        style = {styles.popUpButton}
      >
        <Text style={styles.popUpButtonText}>
          +
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

function AuthScreen() {
  return (
    <Authentication/>
  );
}

const Drawer = createDrawerNavigator();
const HomePage = () =>{
  return(
    <Drawer.Navigator initialRouteName='Home Page'>
      <Drawer.Screen 
        name='Home Page' 
        component={HomeScreen} 
        options={{ 
          headerTitle: '', 
          headerTintColor: '#800080',
          headerStyle: {
            backgroundColor: '#fbeed7', 
          },
        }}
      />
      <Drawer.Screen 
        name='Secure Page' 
        component={AuthScreen} 
        options={{ 
          headerTitle: '', 
          headerTintColor: '#800080',
          headerStyle: {
            backgroundColor: '#fbeed7', 
          },
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    backgroundColor: 'white',
  },

  homePageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: '5%',
    marginBottom: '15%',
  },

  //add task pop-up button styling
  popUpButton: {
    position: 'absolute',
    bottom: 24,
    right: '7%',
    paddingHorizontal: 15,
    backgroundColor: '#800080',
    borderRadius: 40,
  },
  popUpButtonText: {
    alignItems: 'center',
    fontSize: 40,
    color: 'white',
  },
});

export default HomePage;
