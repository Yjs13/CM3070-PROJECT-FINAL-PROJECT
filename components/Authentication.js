// Adapt from 2024 React Native Community
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import { StyleSheet, Text, View, TextInput, Pressable,Alert } from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// to login to the secure page with password
const Authentication = () =>{
    //to set the value of the 'password' textInput
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const goToSecurePage =async()=> {
      const savedPassword = await AsyncStorage.getItem('password');
      const passData = JSON.parse(savedPassword);

      if(passData == null )
      {
        // checks whether user has set up a password for the secure page
        Alert.alert('Please set up a password in New User');
      }
      else if(passData[0][0] == password)
      {
        setPassword('');
        // checks if the password same as the password set by the user
        navigation.navigate('Secure');
      }
      else
      {
        Alert.alert('Incorrect Password');
      }
    }

    const goToSetUpPage = () =>{
      navigation.navigate('Setup Password');
    }

    const goToForgetPage = () =>{
      navigation.navigate('Forget Password');
    }

    return (
        <View 
            style={styles.container}
            accessible={true} 
            accessibilityLabel='Authentication View'
        >
            <View>
                <Text style={styles.titleText}>Please Enter The Password</Text>
                <TextInput 
                    placeholder='Password'
                    secureTextEntry={true}
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {password => setPassword(password)}
                />
                <Pressable style={styles.continueButton} onPress={goToSecurePage}>
                    <Text style={styles.conButtonText}>
                        Continue
                    </Text>
                </Pressable>
                <Pressable style={styles.newUserButton} onPress={goToSetUpPage}>
                  <Text style={styles.newUserText}>
                    New User?
                  </Text>
                </Pressable>
                <Pressable style={styles.newUserButton} onPress={goToForgetPage}>
                  <Text style={styles.newUserText}>
                    Forget Password?
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

  // continue button styling
  continueButton: {
    marginTop: 40,
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  conButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
  },

  // new user button styling
  newUserText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },

});

export default Authentication;
