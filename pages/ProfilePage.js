import { StyleSheet, Text, View,Image,Pressable } from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useNavigation } from '@react-navigation/native';
// Photo by Satyabratasm on Unsplash 
import profileImg from '../assets/Images/satyabratasm-u_kMWN-BWyU-unsplash.jpg';

const ProfilePage = () =>{

  const navigation = useNavigation();
  const goToAboutPage = () => {
    // navigate to the about page
    navigation.navigate('About Us');
  };
  const goToEditProfilePage = () =>{
    // navigate to the edit profile page
    navigation.navigate('Edit Profile');
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
          <Text style={styles.nameText}>Soo Yit Jing</Text>
          <Pressable style={styles.editButton} onPress={() => goToEditProfilePage()}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>
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
    borderRadius: 20,
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
