import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// https://icons8.com/icon/91777/baby-calendar Calendar icon by https://icons8.com Icons8
import CalendarIcon from '../assets/Images/icons8-calendar-64.png';
// https://icons8.com/icon/114436/alarm Reminder icon by https://icons8.com Icons8
import ReminderIcon from '../assets/Images/icons8-reminder-48.png';
// https://icons8.com/icon/znpDNZWhQe6p/lock Lock icon by https://icons8.com
import LockIcon from '../assets/Images/icons8-lock-48.png';
// https://icons8.com/icon/44053/star icon by a https://icons8.com Icons8
import StarIcon from '../assets/Images/icons8-star-64.png';

const WelcomePage = () =>{

  const navigation = useNavigation();
  const goToHomePage=() => {
    navigation.navigate('BottomTab');
  }

  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Welcome Page View'
    >
      <Text style={styles.welcomeText}>
        Welcome To Soo Task Manager Application!!
      </Text>
      <View style={styles.welcomeView}>
        <Text style={styles.title}>
          Main Feature
        </Text>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Calendar Integration</Text>
          <Image source={CalendarIcon}/>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Reminder</Text>
          <Image source={ReminderIcon}/>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Privacy Feature</Text>
          <Image source={LockIcon}/>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Customization</Text>
          <Image source={StarIcon}/>
        </View>
        <Pressable style={styles.nextButton} onPress={goToHomePage}>
          <Text style={styles.nextButtonText}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '40%',
    alignItems: 'center',
  },

  welcomeText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 20,
  },

  welcomeView: {
    width: '80%',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fbeed7',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#800080',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
  },

  // next button styling
  nextButton: {
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 6,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  }

});

export default WelcomePage;
