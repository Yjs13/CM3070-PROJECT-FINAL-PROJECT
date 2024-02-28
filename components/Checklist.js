// checklist component in the home page
// https://reactnative.dev/docs/touchableopacity
// https://reactnative.dev/docs/pressable
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CheckList = ({tickVisible,setTickVisible,setEditFormVisible,setEditFormInfo,setEditIndex,setTitleText,setPriority,checkList}) =>{
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
  }

  // handle task modification //
  // when the user pressed the priority button
  const handlePriority = (i) =>{
    setEditFormVisible(true);
    setEditFormInfo(checkList[i]);
    setEditIndex(i);
    // set the selected task title and priority to the useState
    // this is to make sure if the user does not want to modify the selected task 
    // the task information will remain the same
    setTitleText(checkList[i][0]);
    setPriority(checkList[i][1]);
  }

  return (
    <View style={styles.container}>
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
                        accessible={true}
                        accessibilityLabel='task pressable'
                        onPress={() => handlePriority(i)}
                    >
                        {/* task's title */}
                        <Text style={styles.checkListText}>{task[0]}</Text>

                        {/* priority button, show selected time and enable user to edit the priority */}
                        <TouchableOpacity style={styles.priorityButton} onPress={() => handlePriority(i)}>
                            <Text style={styles.checkListText}>{task[1]}</Text>
                        </TouchableOpacity>

                        {/* checkbox button*/}
                        <TouchableOpacity 
                            style={styles.checkBox} 
                            accessible={true}
                            accessibilityLabel='uncheck box button'
                            onPress={()=> handleCheckBox(i)} 
                        >
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

            {/* checklist container */}
            {checkList.map((task, i) => (
                tickVisible[i] && (
                    <Pressable key={i}
                        style={styles.taskView}
                        disabled={true}
                    >
                        {/* task info such as title, priority and etc */}
                        <Text style={styles.checkListText}>{task[0]}</Text>
                        <Text style={styles.checkListText}>{task[1]}</Text>

                        {/* checkbox button*/}
                        <TouchableOpacity 
                            style={styles.checkBox} 
                            accessible={true}
                            accessibilityLabel='checked box button'
                            onPress={()=> handleCheckBox(i)}
                        >
                            {/* if the state is true then the tick will be visible */}
                            {tickVisible[i] && (
                                <MaterialCommunityIcons name='check' accessible={true} accessibilityLabel='check icon' size={15}/>
                            )}
                        </TouchableOpacity>
                    </Pressable>
                )
            ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    checkListView:{
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
    // priority Button styling
    priorityButton: {
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

export default CheckList;
