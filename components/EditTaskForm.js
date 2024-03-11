// adapt from Github by Adel Reda
// https://github.com/AdelRedaa97/react-native-select-dropdown (22 Feb 2024)

// adapt from react native for button, modal, textInput, pressable
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input
// https://reactnative.dev/docs/pressable

// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)

// Adapt from npm
// https://www.npmjs.com/package/@react-native-community/datetimepicker(28 Feb 2024)
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal, Pressable, ScrollView, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTaskForm = ({editFormVisible,setEditFormVisible,titleText,setTitleText,priority,setPriority,priorities,editFormInfo,checkList,editIndex,mainDueDate,setMainDueDate,timeFrames,timeFrame,setTimeFrame,taskAllInfo,descpText,setDescpText,tickVisible}) =>{
    
    // to set the due date of the task
    // to set the visibility of the date picker
    const [dateVisible, setDateVisible] = useState(false);
    // console.log(mainDueDate.toLocaleDateString());
    // // to set all task information
    // const [taskAllInfo, setTaskAllInfo] = useState([]);

    // handle task modification //
    // when the user save a modified task
    const handleModTask = async() =>{
        // checklist task info that display on the home page
        checkList[editIndex] = [titleText, priority, mainDueDate];
        setEditFormVisible(false);
        // to set all task info 
        taskAllInfo[editIndex] = [titleText, priority, mainDueDate, timeFrame, descpText];

        // saved the edited checklist view task value to the storage (title, due date and tick)
        const savedCheckListData = await AsyncStorage.getItem('checklist');
        const parsedListData = JSON.parse(savedCheckListData);
        // modify the checklist task data
        parsedListData[editIndex] = [titleText, priority, mainDueDate];
        // saved the new value back into the storage
        await AsyncStorage.setItem('checklist', JSON.stringify(parsedListData));

        // saved the whole task info to the storage (title, due date, tick, timeframe and description)
        // this is for the editTask form pop-up form
        const existAllTaskData = await AsyncStorage.getItem('taskInfo');
        const parsedAllTaskData = existAllTaskData ? JSON.parse(existAllTaskData) : [];
        // modify the task data
        parsedAllTaskData[editIndex] = [titleText, priority, mainDueDate, timeFrame, descpText];
        // saved the new value back into the storage
        await AsyncStorage.setItem('taskInfo', JSON.stringify(parsedAllTaskData));
    }

    // to handle the data retrieved from the picker after the user has made changes (ok button is pressed)
    const handleDueDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDateVisible(false);
        setMainDueDate(currentDate);
    };

    // to handle the delete button press to remove the data from the array
    const handleDeleteTask = () => {
        // alert the user about the delete action
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                {
                text: 'Cancel',
                onPress: () => Alert.alert('Cancel Delete Task'),
                style: 'cancel',
                },
                {
                text: 'Delete',
                onPress: () => {removeTask()},
                },
            ],
            {
                cancelable: true,
            },
        );
    }

    // delete task from the list
    const removeTask = async() => {
        taskAllInfo.splice(editIndex, 1);
        checkList.splice(editIndex, 1);
        tickVisible.splice(editIndex, 1);

        // delete task from the storage
        const checkListData = await AsyncStorage.getItem('checklist');
        const parsedListData = JSON.parse(checkListData);
        parsedListData.splice(editIndex,1);
        await AsyncStorage.setItem('checklist', JSON.stringify(parsedListData));

        const tickState = await AsyncStorage.getItem('ticks');
        const parsedTickState = JSON.parse(tickState);
        parsedTickState.splice(editIndex,1);
        await AsyncStorage.setItem('ticks', JSON.stringify(parsedTickState));

        const taskAllData = await AsyncStorage.getItem('taskInfo');
        const parsedTaskAll = JSON.parse(taskAllData);
        parsedTaskAll.splice(editIndex,1);
        await AsyncStorage.setItem('taskInfo', JSON.stringify(parsedTaskAll));

        setEditFormVisible(false);
    }

    // task modification pop-up form
    return (
        <View>
            <Modal 
                visible={editFormVisible}
                accessible={true}
                accessibilityLabel='Edit Task Pop-up Form'
                onRequestClose={() => {
                    setEditFormVisible(!editFormVisible);
            }}>
                <View style={styles.formView}>
                    <View style={styles.formContainer}>
                        {/* task title input box */}
                        <TextInput 
                            defaultValue={editFormInfo[0]}
                            style= {styles.textInputContainer}
                            maxLength= {20}
                            onChangeText= {titleText => setTitleText(titleText)}
                        />

                        {/* priority feature */}
                        <SelectDropdown 
                            data={priorities}
                            defaultButtonText= {editFormInfo[1] ? editFormInfo[1] : 'Priority'}
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
                        {/* the due date button to show the calendar picker for the date */}
                        <Pressable 
                            onPress={()=>setDateVisible(true)}
                            style={styles.dueDateButton}
                        >
                            <Text style={styles.dueDateText}>
                                {mainDueDate.toLocaleDateString()}
                            </Text>
                        </Pressable>
                        {dateVisible && (
                            // the calendar date picker
                            <DateTimePicker
                                value={mainDueDate}
                                mode={'date'}
                                accessible={true}
                                accessibilityLabel='Due Date Calendar Picker'
                                onChange={handleDueDate}
                            />
                        )}

                        {/* timeframe feature */}
                        <SelectDropdown 
                            data={timeFrames}
                            defaultButtonText= {timeFrame}
                            buttonStyle={styles.dropButton}
                            buttonTextStyle={styles.dropButtonText}
                            rowTextStyle={styles.dropRowText}
                            // the time on the selection box after the user has selected a time from the list
                            buttonTextAfterSelection={(selectedTime, i) => {
                                return selectedTime;
                            }}
                            // present rows of time for user selection that was taken from the priorities data array
                            rowTextForSelection={(time, i) => {
                                return time;
                            }}
                            // when the time was selected by the user 
                            onSelect={(selectedTime, i) => setTimeFrame(selectedTime)}
                        />

                        {/* task description input box */}
                        <TextInput 
                            multiline
                            placeholder='Description'
                            defaultValue={descpText}
                            style= {styles.descpContainer}
                            maxLength= {500}
                            onChangeText= {descpText => setDescpText(descpText)}
                        />

                        {/* delete button to delete the task */}
                        <Pressable style={styles.deleteButton} onPress={()=> handleDeleteTask()}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>

                        <View style={styles.buttonView}>
                            {/* Button to save and add in new task to the list */}
                            <Pressable 
                                accessible={true}
                                accessibilityLabel='Save Modified Task Button'
                                style={styles.buttonSave} 
                                onPress={()=> handleModTask()}
                            >
                                <Text style={styles.buttonBoxText}>
                                    Save
                                </Text>
                            </Pressable>
                            {/* Button to cancel the action of trying to add new task */}
                            <Pressable 
                                accessible={true}
                                accessibilityLabel='Cancel Modification Task Button'
                                style={styles.buttonCancel} 
                                onPress={()=> setEditFormVisible(false)}
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
        
    },
    formContainer: {
        padding: '5%',
        paddingTop: '8%',
        backgroundColor: 'white',
    },
    //  title textInput styling
    textInputContainer:
    {
        padding: 5,
        marginBottom: 10, 
        fontSize: 20,
        fontWeight: 'bold',
    },

    // priority drop down button styling 
    dropButton:
    {
        width: '50%',
        backgroundColor: '#fbeed7',
    },
    // drop down button text
    dropButtonText:
    {
        textAlign: 'left',
        fontSize: 18,
    },
    // drop down row text
    dropRowText:
    {
        textAlign: 'left',
        fontSize: 18,
    },

    // due date button styling
    dueDateButton:
    {
        width: '50%',
        marginVertical: 10,
        padding: 5,
        borderWidth: 1,
    },
    dueDateText:
    {
      fontSize: 18,
    },

    // description text input styling
    descpContainer:
    {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
    },

    // delete button styling
    deleteButton:
    {
        width: '30%',
        marginVertical: '20%',
        padding: 5,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    deleteButtonText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
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

export default EditTaskForm;