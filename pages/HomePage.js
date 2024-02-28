// Home Page where it allows user to add, view, and edit tasks
// reference from react native for button, modal, textInput, touchableOpacity, dropdown, pressable
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input
// https://reactnative.dev/docs/touchableopacity
// https://github.com/AdelRedaa97/react-native-select-dropdown
// https://reactnative.dev/docs/pressable
import React, {useState} from 'react';
// import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View, Pressable} from 'react-native';

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

  // priority data
  const priorities = ['high', 'medium', 'low']
  // timeframe data
  const timeFrames = ['30m', '1h', '2h', '3h','5h', '8h', '1d']

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
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: 'white',
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
