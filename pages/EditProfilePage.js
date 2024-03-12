import { StyleSheet, Text, View } from 'react-native';

const EditProfilePage = () =>{
  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Edit Profile Page View'
    >
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '10%',
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'flex-start',
  },

});

export default EditProfilePage;
