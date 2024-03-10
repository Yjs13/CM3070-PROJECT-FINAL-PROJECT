// Adapt from Github by Adel Reda
// https://github.com/AdelRedaa97/react-native-select-dropdown (22 Feb 2024)

// Adapt from React Native
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/pressable
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input

// Adapt from npm
// https://www.npmjs.com/package/@react-native-community/datetimepicker(28 Feb 2024)

// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import { StyleSheet, Text, TextInput, View, Button, Modal, Pressable, Alert } from 'react-native';
import React, { useState } from 'react'
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskForm = ({formVisible,setFormVisible,titleText,setTitleText,priority,setPriority,priorities,checkList,setCheckList,tickVisible,setTickVisible,setMainDueDate}) =>{
  // to set the due date of the task
  // to the picker calendar display
  // default value is the current date of the user timezone  
  const [dueDate, setDueDate] = useState(new Date());
  // to set the due date of the task
  // to set the visibility of the date picker
  const [dateVisible, setDateVisible] = useState(false);
  // to set the title of the due date button
  const [dueDateButtonText, setDueDateText] = useState('Due Date');

  //handle new added task when save button was pressed from the add task form
  const handleNewTask= async (task, prio) =>{
    const newTask = [task, prio, dueDate];
    try {
        // to saved the information of the home page checklist view info
        // saved the title, priority and due date
        // get the checklist task info from the Asyncstorage
        const existTaskData = await AsyncStorage.getItem('checklist');
        const taskValue = existTaskData ? JSON.parse(existTaskData) : [];
        // push in new task info into the array
        taskValue.push(newTask);
        // update the new task info into the storage
        // only accepts string value so the date() need to change to string type
        await AsyncStorage.setItem('checklist', JSON.stringify(taskValue));

        // get the checklist data from the storage
        const savedTaskData = await AsyncStorage.getItem('checklist');
        const parsedTaskData = JSON.parse(savedTaskData);
        // set the storage data to the the checklist
        setCheckList(parsedTaskData);

        // to set the checklists info
        // setCheckList([...checkList, newTask]);

        // save each individual checkbox state
        const existTickData = await AsyncStorage.getItem('ticks');
        const tickState = existTickData ? JSON.parse(existTickData) : [];
        // push in new task info into the array
        tickState.push(false);
        // update the new task info into the storage
        await AsyncStorage.setItem('ticks', JSON.stringify(tickState));

        const savedTickData = await AsyncStorage.getItem('ticks');
        const parsedTickData = JSON.parse(savedTickData);
        // set the storage data to the the checklist
        setTickVisible(parsedTickData);

        // setTickVisible([...tickVisible, false]);
        //after a new task is successfully "saved", the form will be closed
        setFormVisible(false);
        // set the due date button text back to default
        setDueDateText('Due Date');
        // set the main due date value that was shared by other component
        setMainDueDate(dueDate);
        // set back the picker calendar value to the current date of the user
        setDueDate(new Date());
        // set the priority back to '' after the new task is pressed
        setPriority('');
    } catch(e){
        console.error(e);
    }
  }
//   const handleNewTask= (task, prio) =>{
//     const newTask = [task, prio, dueDate];
//     // save the tasks into a list
//     setCheckList([...checkList, newTask]);
//     //after a new task is successfully saved, the form will be closed
//     setFormVisible(false);
//     // save each individual checkbox state
//     setTickVisible([...tickVisible, false]);
//     // set the due date button text back to default
//     setDueDateText('Due Date');
//     // set the main due date value that was shared by other component
//     setMainDueDate(dueDate);
//     // set back the picker calendar value to the current date of the user
//     setDueDate(new Date());
//   }

  // handle cancel task
  const handleCancelTask= () =>{
    setFormVisible(false);
    // set the due date button text back to default
    setDueDateText('Due Date');
  }

  // to handle the data retrieved from the picker after the user has made changes 
  const handleDueDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateVisible(false);
    // to set the picker display to the date user have selected
    setDueDate(currentDate);
    // to set the due date button text to date that user have selected
    setDueDateText(currentDate.toLocaleDateString());
  };


  //add new task pop-up form   
  return (
    <View>
        <Modal 
            visible={formVisible}
            transparent={true}
            accessible={true}
            accessibilityLabel='Add Task Pop-up Form'
            onRequestClose={() => {
            setFormVisible(!formVisible);
        }}>
            <View style={styles.formView}>
                <View style={styles.formContainer}>
                    {/* task title input box */}
                    <TextInput 
                        placeholder='Title'
                        style= {styles.textInputContainer}
                        maxLength= {20}
                        onChangeText= {titleText => setTitleText(titleText)}
                    />

                    {/* priority feature with high, medium and low */}
                    <SelectDropdown 
                        data={priorities}
                        defaultButtonText='Priority'
                        buttonStyle={styles.dropButton}
                        buttonTextStyle={styles.dropButtonText}
                        rowTextStyle={styles.dropRowText}
                        // the time on the selection box after the user has selected a time from the list
                        buttonTextAfterSelection={(selectedPrio, i) => {
                            return selectedPrio;
                        }}
                        // present rows of time for user selection that was taken from the priorities data array
                        rowTextForSelection={(prio, i) => {
                            return prio;
                        }}
                        // when the time was selected by the user 
                        onSelect={(selectedPrio, i) => setPriority(selectedPrio)}
                    />

                    {/* due date feature which sets the due date for the task */}
                    {/* would show a calendar for user to set the due date for the task */}
                    <Pressable 
                        accessible={true}
                        accessibilityLabel='Due Date Button'
                        onPress={()=>setDateVisible(true)}
                        style={styles.dueDateButton}
                    >
                        <Text style={styles.dueDateText}>{dueDateButtonText}</Text>
                    </Pressable>
                    {dateVisible && (
                        <DateTimePicker
                            value={dueDate}
                            mode={'date'}
                            accessible={true}
                            accessibilityLabel='Due Date Calendar Picker'
                            onChange={handleDueDate}
                        />
                    )}

                    <View style={styles.buttonView}>
                        {/* Button to save and add in new task to the list */}
                        <Pressable 
                            accessible={true}
                            accessibilityLabel='Save New Task Button'
                            style={styles.buttonSave} 
                            onPress={()=> handleNewTask(titleText, priority)}
                        >
                            <Text style={styles.buttonBoxText}>
                                Save
                            </Text>
                        </Pressable>
                        <Pressable 
                            accessible={true}
                            accessibilityLabel='Cancel New Task Button'
                            style={styles.buttonCancel} 
                            onPress={()=> handleCancelTask()}
                        >
                            <Text style={styles.buttonBoxText}>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    formView: {
        flex: 1,
        justifyContent: 'center',
    },
    formContainer: {
        margin: '10%',
        padding: '5%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
    },
    //  textInput styling
    textInputContainer:
    {
        padding: 5,
        marginBottom: 8, 
        borderWidth: 1,
        fontSize: 18,
    },

    // priority drop down button styling 
    dropButton:
    {
        width: '60%',
        height: '15%',
    },
    // drop down button text
    dropButtonText:
    {
        textAlign: 'left',
        fontSize: 16,
    },
    // drop down row text
    dropRowText:
    {
        textAlign: 'left',
        fontSize: 16,
    },

    // due date button styling
    dueDateButton:
    {
        width: '60%',
        marginVertical: 8,
        padding: 5,
        borderWidth: 1,
    },
    dueDateText:
    {
      fontSize: 16,
    },

    // save and cancel button styling
    buttonView:
    {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonSave:
    {
        width: '40%',
        padding:5,
        backgroundColor: 'blue',
        borderRadius: 8,
    },
    buttonCancel:
    {
        width: '40%',
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    buttonBoxText:
    {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default AddTaskForm;
