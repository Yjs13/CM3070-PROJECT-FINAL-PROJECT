// adapted from W3Schools
// https://www.w3schools.com/js/js_array_sort.asp (10 Mar 2024)
import { StyleSheet, Text, View, Pressable,Image, Modal } from 'react-native';
import React, {useState, useEffect} from 'react';

// "https://icons8.com/icon/70820/sorting-arrows" Sorting Arrows icon by href="https://icons8.com" Icons8
import ArrowIcon from '../assets/Images/icons8-sorting-arrows-24.png'

// to sort the the task according to algorithm
const SortingTask = ({checkList, setCheckList}) =>{
    const [formVisible, setFormVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [saveData, setSaveData] = useState([]);

    useEffect (()=>{
        const getSavedTask = async()=> {
            try{
                // save the data as a backup
                setSaveData(checkList);
            }catch(e){
                console.error(e)
            }
        }
        getSavedTask()
    },[checkList])

    // to show the sorting task form
    const showSortingForm =()=>{
        setFormVisible(true);
    }

    const priorityValues = {
        Low: 1,
        Medium: 2,
        High: 3
    };

    // sorting algorthim to sort the task in the checklist
    const sortWithPrio = (sort)=> {
        // to set color to the selected text
        setSelectedOption(sort);
        const sortedTasks = saveData.sort((a, b) => {
            const priorityA = priorityValues[a[1]];
            const priorityB = priorityValues[b[1]];
            return priorityB - priorityA;
        });
        setCheckList(sortedTasks);
    }
    // sorting algorithm to sort the task according to the due date
    // the closer the due date from the current date the higher the priority of the task
    const sortWithDueDate = (sort)=> {
        // to set color to the selected text
        setSelectedOption(sort);
        const sortedTasks = saveData.sort((a, b) => {
            const priorityA = priorityValues[new Date(a[2]).toISOString().split('T')[0]];
            const priorityB = priorityValues[new Date(b[2]).toISOString().split('T')[0]];
            return priorityA - priorityB;
        });
        setCheckList(sortedTasks);
    }
    // save the sorting of the checklist to normal
    const sortWithNone = (sort)=> {
        // to set color to the selected text
        setSelectedOption(sort);
        setCheckList(saveData);
    }

    return (
    <View 
        style={styles.container}
        accessible={true} 
        accessibilityLabel='Sorting Task Button'
    >
        <Pressable style={styles.sortinButton} onPress={showSortingForm}>
            <Image source={ArrowIcon}/>
        </Pressable>
        <Modal 
            visible={formVisible}
            transparent={true}
            accessible={true}
            accessibilityLabel='Sorting Task Pop-up Form'
            onRequestClose={() => {
            setFormVisible(!formVisible);
        }}>
            <View>
                <View style={styles.formContainer}>
                    <Pressable style={styles.sortingView} onPress={()=>sortWithPrio('priority')}>
                        <Text style={[styles.sortingText, selectedOption === 'priority' && styles.selectedSort]}>
                            Sorting by Priority
                        </Text>
                    </Pressable>
                    <Pressable style={styles.sortingView} onPress={()=>sortWithDueDate('dueDate')}>
                        <Text style={[styles.sortingText, selectedOption === 'dueDate' && styles.selectedSort]}>
                            Sorting by Due Date
                        </Text>
                    </Pressable>
                    <Pressable style={styles.sortingView} onPress={()=>sortWithNone('none')}>
                        <Text style={[styles.sortingText, selectedOption === 'none' && styles.selectedSort]}>
                            None
                        </Text>
                    </Pressable>
                    {/* Button to close the sorting task form */}
                    <Pressable 
                        accessible={true}
                        accessibilityLabel='Done Button'
                        style={styles.buttonDone} 
                        onPress={() => setFormVisible(false)}
                    >
                        <Text style={styles.buttonBoxText}>
                            Save
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        padding: 3,
        borderWidth: 2,
        borderColor: '#800080',
        borderRadius: 20,
        alignSelf:'flex-end'
    },
    formContainer: {
        margin: '10%',
        marginTop: '20%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
    },   
    sortingView: {
        padding: 5,
    },
    selectedSort: {
        color: '#800080',
    },
    sortingText: {
        fontSize: 18,
        fontWeight: '500',
    },

    buttonDone: {
        padding: 5,
        backgroundColor: '#800080',
    },
    buttonBoxText:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SortingTask;
