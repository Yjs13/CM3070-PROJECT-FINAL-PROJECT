// Home Page where it allows user to add, view, and edit tasks
// adapt from react native for button, modal, textInput, touchableOpacity, dropdown, pressable
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input
// https://reactnative.dev/docs/touchableopacity
// https://reactnative.dev/docs/pressable
// adapt from Github by Adel Reda
// https://github.com/AdelRedaa97/react-native-select-dropdown (22 Feb 2024)
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import React, {useState, useEffect} from 'react';
// import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EditTaskForm from '../components/EditTaskForm';
import AddTaskForm from '../components/AddTaskForm';
import CheckList from '../components/Checklist';

// Home Page of the task manager application
const HomePage = () =>{
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
  //to set the value of the 'Description' textInput
  const [descrText, setDescrText] = useState('');
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
          if (savedCheckListData) {
            const parsedListData = JSON.parse(savedCheckListData);
            setCheckList(parsedListData);
            const parsedTickData = JSON.parse(savedTickData);
            setTickVisible(parsedTickData);
            const parsedAllTaskData = JSON.parse(savedAllTaskData);
            setTaskAllInfo(parsedAllTaskData);
          }
          // else if(savedAllTaskData)
          // {
          //   console.log("h");
          //   const parsedAllTaskData = JSON.parse(savedAllTaskData);
          //   setTaskAllInfo(parsedAllTaskData);
          // }
      } catch (error) {
          console.error('Error in retrieving the saved checklist data:', error);
      }
    };

    getSavedCheckList();
  }, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('checklist');
      console.log(jsonValue != null ? JSON.parse(jsonValue) : null);
      const tickState = await AsyncStorage.getItem('ticks');
      console.log(tickState != null ? JSON.parse(tickState) : null);
      const taskAllData = await AsyncStorage.getItem('taskInfo');
      console.log(taskAllData != null ? JSON.parse(taskAllData) : null);
      // await AsyncStorage.clear();
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View 
      style={styles.container} 
      accessible={true} 
      accessibilityLabel='Home Page View'
    >
        {/* header space for sorting features */}

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
          setCheckList={setCheckList}
          setMainDueDate={setMainDueDate}
          taskAllInfo={taskAllInfo}
          setTaskAllInfo={setTaskAllInfo}
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
              checkList={checkList}
              setCheckList={setCheckList}
              tickVisible={tickVisible}
              setTickVisible={setTickVisible}
              setMainDueDate={setMainDueDate}
            />

            {/* add task button to show the pop up form */}
            <Pressable
              accessible={true}
              accessibilityLabel='Add Task Button'
              onPress={()=> setFormVisible(true)}
              style = {styles.popUpButton}
            >
              <Text style={styles.popUpButtonText}>
                Add Task
              </Text>
            </Pressable>
            <Pressable
              accessible={true}
              accessibilityLabel='Get Data'
              onPress={()=> getData()}
              style = {styles.popUpButton}
            >
              <Text style={styles.popUpButtonText}>
                Get Data
              </Text>
            </Pressable>
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
          setTaskAllInfo={setTaskAllInfo}
          descpText={descpText}
          setDescpText={setDescpText}
          tickVisible={tickVisible}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },

  //add task pop-up button styling
  popUpButton: {
    padding: 10,
    backgroundColor: '#6CB4EE',
  },
  popUpButtonText: {
    fontSize: 20,
  },
});

export default HomePage;
