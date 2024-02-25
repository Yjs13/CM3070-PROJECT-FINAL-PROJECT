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
import { StyleSheet, Text, TextInput, View, Pressable, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';

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
  // to set the value of the 'Timeframe' input
  const [timeFrame, setTimeFrame] = useState('');

  // timeframe data
  const timeFrames = ["30m", "1h", "2h", "3h","5h", "8h", "1d"]

  //handle new added task when save button was pressed from the add task form
  const handleNewTask= (task, time) =>{
    const newTask = [task, time];
    // save the tasks into a list
    setCheckList([...checkList, newTask]);
    //after a new task is successfully saved, the form will be closed
    setFormVisible(false);
    // save each individual checkbox state
    setTickVisible([...tickVisible, false]);
  }

  // handle the checkBox
  const handleCheckBox= (taskId) =>{
    // when the checkBox was pressed by the user the tick will appear
    // enable click and unclick the checkbox
    if(tickVisible[taskId] == true)
    {
      const newTickVisible = [...tickVisible];
      newTickVisible[taskId] = false;
      setTickVisible(newTickVisible);
    }
    else if(tickVisible[taskId] == false)
    {
      const newTickVisible = [...tickVisible];
      newTickVisible[taskId] = true;
      setTickVisible(newTickVisible);
    }
    // console.log(checkList);
    // console.log(tickVisible);
  }

  // handle task modification //
  // when the user pressed the timeFrame button
  const handleTimeFrame = (i) =>{
    setEditFormVisible(true);
    setEditFormInfo(checkList[i]);
    setEditIndex(i);
    // set the selected task title and timeframe to the useState
    // this is to make sure if the user does not want to modify the selected task 
    // the task information will remain the same
    setTitleText(checkList[i][0]);
    setTimeFrame(checkList[i][1]);
  }
  // when the user save a modified task
  const handleModTask = (task, time) =>{
    checkList[editIndex] = [task, time];
    setEditFormVisible(false);
  }

  return (
    <View 
      style={styles.container} 
      accessible={true} 
      accessibilityLabel='Home Page View'
    >
        {/* header space for sorting features */}

        {/* tasks checklist added by the user container*/}
        {/* not completed task list */}
        <View style={styles.checkListView}>
          {/* each task container */}
          {checkList.map((task, i) => (
            // task will only appear on the list above when the tick is false
            // if the checkbox was ticked by the user, then the task will be hidden 
            // from the task checklist at the top of the page
            // then the task will be show at the bottom Completed Task Checklist area
            tickVisible[i] === false && (
              <Pressable key={i}
                  style={styles.taskView}
              >
                {/* task's title */}
                <Text style={styles.checkListText}>{task[0]}</Text>

                {/* timeFrame button, show selected time and enable user to edit the timeframe */}
                <TouchableOpacity style={styles.timeFrameButton} onPress={() => handleTimeFrame(i)}>
                  <Text style={styles.checkListText}>{task[1]}</Text>
                </TouchableOpacity>

                {/* checkbox button*/}
                <TouchableOpacity style={styles.checkBox} onPress={()=> handleCheckBox(i)}>
                  {/* if the state is true then the tick will be visible */}
                  {tickVisible[i] && (
                    <MaterialCommunityIcons name='check' size={15}/>
                  )}
                </TouchableOpacity>
              </Pressable>
            )
          ))}
        </View>

        {/* completed task list view */}
        {/* appear when checkbox was clicked */}
        <View style={styles.checkListView}>
          {/* the completed task title appear when there is a true found in the tickVisible state array */}
          {tickVisible.some((tick) => tick) && <Text style={styles.complTaskTitle}>Completed Task</Text>}
          {checkList.map((task, i) => (
            tickVisible[i] && (
              <Pressable key={i}
                  style={styles.taskView}
                  disabled={true}
              >
                <Text style={styles.checkListText}>{task[0]}</Text>
                <Text style={styles.checkListText}>{task[1]}</Text>
                {/* checkbox button*/}
                <TouchableOpacity style={styles.checkBox} onPress={()=> handleCheckBox(i)}>
                  {/* if the state is true then the tick will be visible */}
                  {tickVisible[i] && (
                    <MaterialCommunityIcons name='check' size={15}/>
                  )}
                </TouchableOpacity>
              </Pressable>
            )
          ))}
        </View>

        {/* add tasks feature */}
        <View>
            {/* add task pop-up form */}
            <Modal 
                visible={formVisible}
                transparent={true}
                onRequestClose={() => {
                    setFormVisible(!formVisible);
            }}>
                <View style={styles.formView}>
                    <View style={styles.formContainer}>
                        <TextInput 
                            placeholder='Title'
                            style= {styles.textInputContainer}
                            maxLength= {20}
                            onChangeText= {titleText => setTitleText(titleText)}
                        />
                        {/* <TextInput 
                            placeholder='Description'
                            style= {styles.textInputContainer}
                            maxLength= {250}
                            // onChangeText= {descrText => setDescrText(descrText)}
                        /> */}
                        {/* timeframe feature */}
                        <SelectDropdown 
                          data={timeFrames}
                          defaultButtonText='Add Timeframe'
                          // the time on the selection box after the user has selected a time from the list
                          buttonTextAfterSelection={(selectedTime, i) => {
                            return selectedTime;
                          }}
                          // present rows of time for user selection that was taken from the timeframes data array
                          rowTextForSelection={(time, i) => {
                            return time;
                          }}
                          // when the time was selected by the user 
                          onSelect={(selectedTime, i) => setTimeFrame(selectedTime)}
                        />

                        {/* Button to save and add in new task to the list */}
                        <Button title='Save'
                            onPress={()=> handleNewTask(titleText, timeFrame)}
                        />
                        {/* Button to cancel the action of trying to add new task */}
                        <Button title='Cancel'
                            onPress={()=> setFormVisible(false)}
                            color={'red'}
                        />
                    </View>
                </View>
            </Modal>

            {/* add task button to show the pop up form */}
            <Pressable
                onPress={()=> setFormVisible(true)}
                style = {styles.popUpButton}
            >
                <Text style={styles.popUpButtonText}>
                    Add Task
                </Text>
            </Pressable>
        </View>

        {/* pop-up form to enable the user to edit the task */}
        <View>
          <Modal 
              visible={editFormVisible}
              transparent={true}
              onRequestClose={() => {
                  setEditFormVisible(!editFormVisible);
          }}>
              <View style={styles.formView}>
                  <View style={styles.formContainer}>
                      <TextInput 
                          placeholder= {editFormInfo[0]}
                          style= {styles.textInputContainer}
                          maxLength= {20}
                          onChangeText= {titleText => setTitleText(titleText)}
                      />
                      {/* timeframe feature */}
                      <SelectDropdown 
                        data={timeFrames}
                        defaultButtonText= {editFormInfo[1]}
                        // the time on the selection box after the user has selected a time from the list
                        buttonTextAfterSelection={(selectedTime, i) => {
                          return selectedTime;
                        }}
                        // present rows of time for user selection that was taken from the timeframes data array
                        rowTextForSelection={(time, i) => {
                          return time;
                        }}
                        // when the time was selected by the user 
                        onSelect={(selectedTime, i) => setTimeFrame(selectedTime)}
                      />

                      {/* Button to save and add in new task to the list */}
                      <Button title='Save'
                          onPress={()=> handleModTask(titleText, timeFrame)}
                      />
                      {/* Button to cancel the action of trying to add new task */}
                      <Button title='Cancel'
                          onPress={()=> setEditFormVisible(false)}
                          color={'red'}
                      />
                  </View>
              </View>
          </Modal>
        </View>
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

  //pop-up button styling
  popUpButton: {
    padding: 10,
    backgroundColor: '#6CB4EE',
  },
  popUpButtonText: {
    fontSize: 20,
  },

  // pop-up form styling  
  formView: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    margin: '10%',
    padding: '5%',
    backgroundColor: 'white',
    borderWidth: 2,
  },
  //  textInput styling
  textInputContainer:
  {
    padding: 5,
    marginBottom: 8, 
    borderWidth: 1,
  },

  //checklist styling
  checkListView:
  {
    width: '100%',
    padding: 10,
  },
  taskView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  checkListText: {
    fontSize: 20,
  },
  // timeFrame Button styling
  timeFrameButton: {
    paddingHorizontal: 5,
    backgroundColor: '#00BFFF',
    borderWidth: 1,
  },
  // checkbox styling
  checkBox: {
    width: '7%',
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:1,
  },

  // completed task list styling
  complTaskTitle: {
    fontSize: 20,
    color: 'white',
  },
});

export default HomePage;
