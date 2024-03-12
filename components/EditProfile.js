import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Photo by Satyabratasm on Unsplash 
import rabbitImg from '../assets/Images/satyabratasm-u_kMWN-BWyU-unsplash.jpg';
// Photo by charlesdeluvio on Unsplash
import dogImg from '../assets/Images/charlesdeluvio-Mv9hjnEUHR4-unsplash.jpg';
// Photo by Geronimo Giqueaux on Unsplash 
import catImg from '../assets/Images/geronimo-giqueaux-pr1M1Y7zdik-unsplash.jpg';

const EditProfilePage = ({editFormVisible, setEditFormVisible, setUserName, profileImg, setProfileImg, imgState, img1State}) =>{
  const [nameText, setNameText] = useState('');
  const [selectedImg, setImg] = useState(profileImg);

  // change the profile picture when the img was pressed
  const handleRabImgPress =()=>{
    setImg(require('../assets/Images/satyabratasm-u_kMWN-BWyU-unsplash.jpg'));
  };
  const handleDogImgPress =()=>{
    setImg(require('../assets/Images/charlesdeluvio-Mv9hjnEUHR4-unsplash.jpg'));
  };
  const handleCatImgPress =()=>{
    setImg(require('../assets/Images/geronimo-giqueaux-pr1M1Y7zdik-unsplash.jpg'));
  };

  // save the username into the storage
  const saveEdit =async()=> {
    await AsyncStorage.setItem('username', JSON.stringify(nameText));
    await AsyncStorage.setItem('profileImg', JSON.stringify(selectedImg));
    setUserName(nameText);
    setProfileImg(selectedImg);
    setEditFormVisible(false);
  }

  return (
    <View>
        <Modal 
            visible={editFormVisible}
            accessible={true}
            accessibilityLabel='Edit Profile Form'
            onRequestClose={() => {
            setEditFormVisible(!editFormVisible)
        }}>
            <View style={styles.container}>
                {/* profile picture */}
                <View>
                    <Image source={selectedImg} style={styles.profilePic}/>
                </View>

                {/* picture choices */}
                <View style={styles.imagesContainer}>
                    <View style={styles.images}>
                        <Pressable onPress={() => handleRabImgPress()}>
                            <Image source={rabbitImg} style={styles.profilePics}/>
                        </Pressable>
                        <Pressable onPress={() => handleDogImgPress()} disabled={imgState}>
                            <Image source={dogImg} style={styles.profilePics}/>
                        </Pressable>
                        <Pressable onPress={() => handleCatImgPress()} disabled={img1State}>
                            <Image source={catImg} style={styles.profilePics}/>
                        </Pressable>
                    </View>
                </View>

                {/* username input box */}
                <TextInput 
                    placeholder='Username'
                    defaultValue= {nameText}
                    style= {styles.textInputContainer}
                    maxLength= {20}
                    onChangeText= {nameText => setNameText(nameText)}
                />
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonSave} onPress={() => saveEdit()}>
                        <Text style={styles.buttonBoxText}>
                            Save
                        </Text>
                    </Pressable>
                    <Pressable style={styles.buttonCancel} onPress={() => setEditFormVisible(false)}>
                        <Text style={styles.buttonBoxText}>
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '8%',
  },
  profilePic: {
    width:100,
    height:100,
    borderRadius: 30,
  },
  profilePics: {
    width:100,
    height:100,
    marginVertical: 30,
    borderRadius: 30,
  },
  imagesContainer: {

  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //  textInput styling
  textInputContainer:
  {
    padding: 5,
    marginBottom: 8, 
    borderWidth: 1,
    fontSize: 18,
  },

  // save and cancel button styling
  buttonView:
  {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSave:
  {
    width: '40%',
    padding:5,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  buttonCancel:
  {
    width: '40%',
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  buttonBoxText:
  {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EditProfilePage;
