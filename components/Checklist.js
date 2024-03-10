// checklist component in the home page
// https://reactnative.dev/docs/touchableopacity
// https://reactnative.dev/docs/pressable
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckList = ({tickVisible,setTickVisible,setEditFormVisible,setEditFormInfo,setEditIndex,setTitleText,setPriority,checkList,setCheckList,setMainDueDate,taskAllInfo,setTaskAllInfo,setTimeFrame,setDescpText}) =>{

  // handle the checkBox
  const handleCheckBox= async(taskId) =>{
    // when the checkBox was pressed by the user the tick will appear
    // enable click and unclick the checkbox
    if(tickVisible[taskId] == true)
    {
        // const newTickVisible = [...tickVisible];
        // newTickVisible[taskId] = false;

        // retrieve the tick data from the storage
        const existTickData = await AsyncStorage.getItem('ticks');
        const parsedTickData = JSON.parse(existTickData);
        // modify the tick state of the checklist task to false
        parsedTickData[taskId] = false;
        // saved the new value back into the storage
        await AsyncStorage.setItem('ticks', JSON.stringify(parsedTickData));

        const savedTickData = await AsyncStorage.getItem('ticks');
        const parsedData = JSON.parse(savedTickData);
        setTickVisible(parsedData);
        // setTickVisible(newTickVisible);
    }
    else if(tickVisible[taskId] == false)
    {
        // const newTickVisible = [...tickVisible];
        // newTickVisible[taskId] = true;

        // retrieve the tick data from the storage
        const existTickData = await AsyncStorage.getItem('ticks');
        const parsedTickData = JSON.parse(existTickData);
        // modify the tick state of the checklist task to true
        parsedTickData[taskId] = true;
        // saved the new value back into the storage
        await AsyncStorage.setItem('ticks', JSON.stringify(parsedTickData));

        const savedTickData = await AsyncStorage.getItem('ticks');
        const parsedData = JSON.parse(savedTickData);
        setTickVisible(parsedData);
        // setTickVisible(newTickVisible);
    }
  }

  // handle task modification //
  // when the user pressed the whole checklist or priority button
  const handleTaskInfoView = async(i) =>{
    setEditFormVisible(true);
    setEditFormInfo(checkList[i]);
    setEditIndex(i);
    // set the selected task info to the useState
    // this is to make sure if the user does not want to modify the selected task 
    // the task information will remain the same
    setTitleText(checkList[i][0]);
    setPriority(checkList[i][1]);
    // set the storage saved string value to date format
    setMainDueDate(new Date(checkList[i][2]));
    // setTaskAllInfo(parsedAllTaskData);

    // checks whether the task extra info(timeframe, description) was set by the user for the selected task
    // if(taskAllInfo !== undefined && taskAllInfo !== null && taskAllInfo.length == i)
    if(taskAllInfo[i] !== undefined && taskAllInfo[i] !== null)
    {
        const savedAllTaskData = await AsyncStorage.getItem('taskInfo');
        const parsedAllTaskData = JSON.parse(savedAllTaskData);
        // set the timeframe info to the task and show it in the edit task form
        // setTimeFrame(taskAllInfo[i][3]);
        setTimeFrame(parsedAllTaskData[i][3]);
        setDescpText(taskAllInfo[i][4]);
    }
    else
    {
        setTimeFrame('Timeframe');
        setDescpText('');
    }
    // if(taskAllInfo[i] !== undefined)
    // {
    //     // set the timeframe info to the task and show it in the edit task form
    //     setTimeFrame(taskAllInfo[i][3]);
    //     setDescpText(taskAllInfo[i][4]);
    // }
    // else
    // {
    //     setTimeFrame('Timeframe');
    //     setDescpText('');
    // }
  }

  return (
    <View style={styles.container}>
        {/* tasks checklist added by the user container*/}
        {/* not completed task list */}
        <View style={styles.checkListView}>
            {/* the incompleted task title appear when there is a false found in the tickVisible state array */}
            {tickVisible.some((tick) => !tick) && <Text style={styles.complTaskTitle}>Incompleted Task</Text>}

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
                        onPress={() => handleTaskInfoView(i)}
                    >
                        {/* task's title */}
                        <Text style={styles.checkListText}>{task[0]}</Text>

                        {/* priority button, show selected time and enable user to edit the priority */}
                        <TouchableOpacity style={styles.priorityButton} onPress={() => handleTaskInfoView(i)}>
                            <Text style={styles.prioText}>{task[1] ? task[1] : 'Priority'}</Text>
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
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fbeed7',
        borderWidth: 1,
        borderColor: 'grey',
    },
    checkListText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // priority Button styling
    priorityButton: {
        paddingVertical: 4,
        paddingHorizontal: 7,
        backgroundColor: '#800080',
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 8,
        borderColor: '#b9bcbf',
    },
    prioText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    // checkbox styling
    checkBox: {
        width: '8%',
        height: 30,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        borderWidth:1,
        borderRadius: 3,
        borderColor: 'grey',
    },

    // completed task list styling
    complTaskTitle: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CheckList;
