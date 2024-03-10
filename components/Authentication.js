import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

// to login to the secure page with password
const Authentication = () =>{
    //to set the value of the 'password' textInput
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const goToSecurePage =()=> {
        navigation.navigate('Secure');
    }

    const goToSetUpPage = () =>{
      navigation.navigate('Setup Password')
    }

    return (
        <View 
            style={styles.container}
            accessible={true} 
            accessibilityLabel='Authentication View'
        >
            <View style={styles.passwordView}>
                <Text style={styles.titleText}>Please Enter The Password</Text>
                <TextInput 
                    placeholder='Password'
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
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  conButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },

  // new user button styling
  newUserText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },

});

export default Authentication;
