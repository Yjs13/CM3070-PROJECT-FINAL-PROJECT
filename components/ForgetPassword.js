// Adapt from 2024 React Native Community
// https://react-native-async-storage.github.io/async-storage/docs/usage (29 Feb 2024)
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// for user to retrieve their forgotten password
const ForgetPass = () =>{
    const [passwordData, setPasswordData] = useState('');
    const [quizValue, setQuizValue] = useState('');
    const [passVisible, setPassVisible] = useState(false);

    useEffect(()=> {
        const getSavedPassword = async () => {
            try{
                // retrieve the password data from the storage
                const savedPassword = await AsyncStorage.getItem('password');
                const passData = JSON.parse(savedPassword);
                setPasswordData(passData);
            }catch(e){
                console.error(e);
            }
        }
        getSavedPassword();
    },[])

    const showPassword = ()=> {
        if(passwordData == null)
        {
            Alert.alert('No password is saved');
        }
        else if(quizValue == passwordData[0][1])
        {
            setPassVisible(true);
        }
        else
        {
            Alert.alert('Incorrect Answer');
        }
    }

    return (
        <View 
            style={styles.container}
            accessible={true} 
            accessibilityLabel='Profile Page View'
        >
            <View>
                <Text style={styles.quizText}>What is your favourite animal? (The answer below will be used to retrieve your forget password)</Text>
                <TextInput
                    placeholder='Answer for retrieving password'
                    maxLength={20}
                    style= {styles.textInputContainer}
                    onChangeText= {quizValue => setQuizValue(quizValue)}
                />
                <Pressable style={styles.continueButton} onPress={showPassword}>
                    <Text style={styles.conButtonText}>
                        Answer
                    </Text>
                </Pressable>
                {passVisible === true && (
                    <Text>Your Password is {passwordData[0][0]}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    paddingTop: '10%',
    flex: 1,
    alignSelf:'center',
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
    marginBottom: 10,
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

export default ForgetPass;
