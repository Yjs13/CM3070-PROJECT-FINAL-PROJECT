// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// for new user to set up new password to access the secure page
const SetupPassword = () =>{
    //to set the value of the 'password' textInput
    const [password, setPassword] = useState('');

    return (
        <View 
            style={styles.container}
            accessible={true} 
            accessibilityLabel='Set Up Password View'
        >
            <View style={styles.passwordView}>
                <Text style={styles.titleText}>Set Up A Password</Text>
                <TextInput 
                    placeholder='Password'
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {password => setPassword(password)}
                />
                <TextInput 
                    placeholder='Confirm Password'
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {password => setPassword(password)}
                />
                <Pressable style={styles.continueButton}>
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
  passwordView: {
    
  },

  titleText: {
    marginBottom: 30,
    textAlign:'center',
    fontSize: 20,
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
    // marginHorizontal: 30,
    padding: 8,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  conButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  }

});

export default SetupPassword;
