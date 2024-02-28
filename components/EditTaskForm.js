// https://github.com/AdelRedaa97/react-native-select-dropdown
// https://reactnative.dev/docs/button
// https://reactnative.dev/docs/modal
// https://reactnative.dev/docs/handling-text-input
import { StyleSheet, TextInput, View, Button, Modal } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const EditTaskForm = ({editFormVisible,setEditFormVisible,titleText,setTitleText,priority,setPriority,priorities,editFormInfo,checkList,editIndex}) =>{
    // handle task modification //
    // when the user save a modified task
    const handleModTask = (task, time) =>{
        checkList[editIndex] = [task, time];
        setEditFormVisible(false);
    }

    // task modification pop-up form
    return (
        <View>
            <Modal 
                visible={editFormVisible}
                onRequestClose={() => {
                    setEditFormVisible(!editFormVisible);
            }}>
                <View style={styles.formView}>
                    <View style={styles.formContainer}>
                        {/* task title input box */}
                        <TextInput 
                            // placeholder= {editFormInfo[0]}
                            defaultValue={editFormInfo[0]}
                            style= {styles.textInputContainer}
                            maxLength= {20}
                            onChangeText= {titleText => setTitleText(titleText)}
                        />
                        {/* priority feature */}
                        <SelectDropdown 
                            data={priorities}
                            defaultButtonText= {editFormInfo[1]}
                            // the time on the selection box after the user has selected a time from the list
                            buttonTextAfterSelection={(selectedTime, i) => {
                            return selectedTime;
                            }}
                            // present rows of time for user selection that was taken from the priorities data array
                            rowTextForSelection={(time, i) => {
                            return time;
                            }}
                            // when the time was selected by the user 
                            onSelect={(selectedTime, i) => setPriority(selectedTime)}
                        />

                        {/* Button to save and add in new task to the list */}
                        <Button title='Save'
                            onPress={()=> handleModTask(titleText, priority)}
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
    //  textInput styling
    textInputContainer:
    {
        padding: 5,
        marginBottom: 8, 
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default EditTaskForm;