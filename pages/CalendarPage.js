import { StyleSheet, Text, View } from 'react-native';

const CalendarPage = () =>{
  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Calendar Page View'
      >
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'flex-start',
  },

});

export default CalendarPage;
