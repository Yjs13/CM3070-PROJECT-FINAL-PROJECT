// https://github.com/AdelRedaa97/react-native-select-dropdown
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input
// https://github.com/react-native-datetimepicker/datetimepicker
import { StyleSheet, TextInput, View, Button, Modal } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTaskForm = ({formVisible,setFormVisible,titleText,setTitleText,priority,setPriority,priorities,checkList,setCheckList,tickVisible,setTickVisible}) =>{
  //handle new added task when save button was pressed from the add task form
  const handleNewTask= (task, prio) =>{
    const newTask = [task, prio];
    // save the tasks into a list
    setCheckList([...checkList, newTask]);
    //after a new task is successfully saved, the form will be closed
    setFormVisible(false);
    // save each individual checkbox state
    setTickVisible([...tickVisible, false]);
  }

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


                    {/* Button to save and add in new task to the list */}
                    <Button title='Save'
                        accessible={true}
                        accessibilityLabel='Save New Task Button'
                        onPress={()=> handleNewTask(titleText, priority)}
                    />
                    {/* Button to cancel the action of trying to add new task */}
                    <Button title='Cancel'
                        onPress={()=> setFormVisible(false)}
                        color={'red'}
                    />
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
    },
    //  textInput styling
    textInputContainer:
    {
        padding: 5,
        marginBottom: 8, 
        borderWidth: 1,
    },
});

export default AddTaskForm;
