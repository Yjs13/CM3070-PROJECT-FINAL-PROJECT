import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable,} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Photo by Satyabratasm on Unsplash 
// import profileImg from '../assets/Images/satyabratasm-u_kMWN-BWyU-unsplash.jpg';

// components
import EditProfilePage from '../components/EditProfile';

const ProfilePage = () =>{
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [userName, setUserName] = useState('Username');
  // default img rabbit
  const [profileImg, setProfileImg] = useState(require('../assets/Images/satyabratasm-u_kMWN-BWyU-unsplash.jpg'));
  const [imgState, setImgState] = useState(true);
  const [img1State, setImg1State] = useState(true);

  useEffect(()=> {
    const getSavedUserName = async()=> {
      try{
        const savedUsername = await AsyncStorage.getItem('username');
        const savedProfileImg = await AsyncStorage.getItem('profileImg');
  
        if(savedUsername)
        {
          const parsedUsername = JSON.parse(savedUsername);
          setUserName(parsedUsername);
        }
        if(savedProfileImg)
        {
          const parsedProfileImg = JSON.parse(savedProfileImg);
          setProfileImg(parsedProfileImg);
        }
      }catch(error)
      {
        console.error(error);
      }
    }
    getSavedUserName();
  },[]);

  const showEditForm=async()=> {
    setEditFormVisible(true);

    // gamification feature
    // checks for the number of completed task
    // if one completed task reward the user one extra img
    const savedTicks = await AsyncStorage.getItem('ticks');
    if(savedTicks)
    {
      const parsedTicks = JSON.parse(savedTicks);
      let count = 0;
      for(i=0; i<parsedTicks.length; i++)
      {
        if(parsedTicks[i])
        {
          count++;
        }
      }

      if(count >= 5)
      {
        setImg1State(false);
      }
      else if(count >= 1)
      {
        setImgState(false);
      }
    }
    setEditFormVisible(true);
  }

  const navigation = useNavigation();
  const goToAboutPage = () => {
    // navigate to the about page
    navigation.navigate('About Us');
  };

  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Profile Page View'
    >
      <View style={styles.profileInfo}>
        <View>
          <Image source={profileImg} style={styles.profilePic}/>
        </View>
        <View>
          <Text style={styles.nameText}>{userName}</Text>
          <Pressable style={styles.editButton} onPress={() => showEditForm()}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>
      <EditProfilePage
        editFormVisible={editFormVisible}
        setEditFormVisible={setEditFormVisible}
        setUserName={setUserName}
        profileImg={profileImg}
        setProfileImg={setProfileImg}
        imgState={imgState}
        img1State={img1State}
      />
      <TableView style={styles.table}>
        <Section header="Preferences" headerTextStyle={styles.headerText}>
          <Cell
            cellStyle='Basic'
            accessory="DisclosureIndicator"
            title="Notification"
          />
        </Section>
        
        <Section header="More" headerTextStyle={styles.headerText}>
          <Cell
            cellStyle='Basic'
            accessory="DisclosureIndicator"
            title="About Us"
            onPress={() => goToAboutPage()}
          />
        </Section>
      </TableView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '10%',
    flex: 1,
  },
  profilePic: {
    width:100,
    height:100,
    marginRight: 45,
    borderRadius: 30,
  },
  profileInfo: {
    marginTop: '13%',
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'center'
  },

  nameText: {
    fontSize:20,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 7,
    backgroundColor: '#800080',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 8,
    borderColor: '#b9bcbf',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // tableView styling
  table: {
    width: '100%',
  },
  headerText: {
    fontSize: 20, 
    fontWeight:'bold', 
    color: 'black',
  },
});

export default ProfilePage;
