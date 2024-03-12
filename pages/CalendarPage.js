// adapt from Github by Tautvilas Mecinskas and Katrin Zotchev, 2017 Wix.com
// https://github.com/wix/react-native-calendars?tab=readme-ov-file (29 Feb 2024)
// reference from a forum at stack overflow from Minty Fresh on 29 Feb 2024
// https://stackoverflow.com/questions/47066555/remove-time-after-converting-date-toisostring (29 Feb 2024)
// Adapt from 2024 React Native Community
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import React, {useEffect, useState} from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPage = () =>{
  // to set the state of the selected day
  const [selected, setSelected] = useState('');
  // to set the current date of the user
  const [currentDate, setCurrentDate] = useState(new Date());

  // to set the saved checklist task info
  const [tasks, setTask] = useState([]);
  // to set the task info that will be shown on the pressable button
  const [dayTask, setDayTask] = useState([]); 
  // set all the date where it have task
  const [taskDates, setTaskDates] = useState([]);

  // call every time when the selected value changed
  useEffect(()=> {
    const getSavedTaskInfo = async() => {
      try{
        // to retrieve the dat from the checklist storage
        const savedCheckListData = await AsyncStorage.getItem('checklist');
        const parsedListData = JSON.parse(savedCheckListData);
        setTask(parsedListData);
        // from the checklist retrieve the date value
        const taskD = parsedListData.map(task => task[2].split('T')[0]);
        setTaskDates(taskD);
        // retrieve the data of the task according the selected date that the user has pressed on the calendar
        const dayT = parsedListData.filter(task => task[2].split('T')[0] === selected);
        setDayTask(dayT);
      }catch(error){
        console.error('Error in retrieving the saved checklist data for the Calendar page:', error);
      }
    }
    getSavedTaskInfo();
  },[selected]);

  // checks for selected day
  // marked the saved task date with dots
  const markedDay = Object.fromEntries(taskDates.map(date => [date, { marked: true, dotColor: 'orange' }]));
  // when the date selected set the circle color
  if(selected)
  {
    markedDay[selected] = {
      selected: true,
      disableTouchEvent: true,
    }
  }
  const handleCalendarPress = (date) => {
    // set the selected day data
    setSelected(date);
    // reset the data
    setTaskDates([]);
    setDayTask([]);
  }

  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Calendar Page View'
    >
      <Calendar
        style={styles.calendarView}
        // set the calendar to show the user current date
        current={currentDate.toISOString().split('T')[0]}
        // Callback that gets called when the user selects a day
        onDayPress={day => {
          handleCalendarPress(day.dateString);
        }}
        // Mark specific dates as marked
        markedDates={markedDay}
      />
      <View>
        {dayTask.map((task, i) => (
          <Pressable style={styles.dayTaskView} key={i}>
            <Text style={styles.dayTaskTitle}>{task[0]}</Text>
            <Text style={styles.dayTaskPrio}>{task[1]}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#800080',
  },

  // calendar styling
  calendarView: {
    marginBottom: 20,
    paddingTop: '10%',
  },

  // task info at the bottom of the calendar styling
  dayTaskView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fbeed7',
    borderRadius: 2,
  },
  dayTaskTitle: {
    marginLeft: 10,
    marginRight: 30,
    fontSize: 17,
    fontWeight: 'bold',
  },
  dayTaskPrio: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default CalendarPage;
