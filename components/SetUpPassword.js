// Adapt from 2024 React Native Community
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// for new user to set up new password to access the secure page
const SetupPassword = () =>{
    //to set the value of the 'password' textInput
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [quiz, setQuiz] = useState('');

    const navigation = useNavigation();
    const saveNewPassword = async() => {
      try{
        const savedPassword = await AsyncStorage.getItem('password');
        const passData = JSON.parse(savedPassword);
        if(password.length == 0 || confirmPass.length == 0)
        {
          // check if user input password into the text input
          Alert.alert('Please enter your password');
        }
        else if(quiz.length == 0)
        {
          Alert.alert('Please answer the quiz!!');
        }
        else if(password != confirmPass)
        {
          // checks if the password and confirm is match before saving it into the storage
          Alert.alert('Password not match. Please reset your confirm password.');
        }
        else if(passData != null)
        {
          // allows only one user to set up the password
          Alert.alert('You have set the password for this secure page');
        }
        else if(password == confirmPass)
        {
          // to saved the password set by the user to login into the secure page
          // get the password data from the Asyncstorage
          const passwordData = await AsyncStorage.getItem('password');
          const passValue = passwordData ? JSON.parse(passwordData) : [];
          // push in new task info into the array
          savedData = [password, quiz]
          passValue.push(savedData);
          // update the new password into the storage
          // only accepts string value so the date() need to change to string type
          await AsyncStorage.setItem('password', JSON.stringify(passValue));
          navigation.navigate('Authentication');
        }
      } catch(e)
      {
        console.error(e)
      }
    }

    return (
        <View 
            style={styles.container}
            accessible={true} 
            accessibilityLabel='Set Up Password View'
        >
            <View>
                <Text style={styles.titleText}>Set Up A Password</Text>
                <TextInput 
                    placeholder='Password'
                    secureTextEntry={true}
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {password => setPassword(password)}
                />
                <TextInput 
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {confirmPass => setConfirmPass(confirmPass)}
                />
                <Text style={styles.quizText}>What is your favourite animal? (The answer below will be used to retrieve your forget password)</Text>
                <TextInput
                  placeholder='Answer for retrieving password'
                  maxLength={20}
                  style= {styles.textInputContainer}
                  onChangeText= {quiz => setQuiz(quiz)}
                />
                <Pressable style={styles.continueButton} onPress={saveNewPassword}>
                    <Text style={styles.conButtonText}>
                        Set Up
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    marginBottom: 30,
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  //  password text input styling
  textInputContainer:
  {
    padding: 5,
    marginBottom: 10, 
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  // forget password text styling
  quizText: {
    marginTop: 20,
    fontSize: 15,
  },

  // continue button styling
  continueButton: {
    marginTop: 40,
    padding: 8,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  conButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SetupPassword;
