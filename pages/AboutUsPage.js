import React, { useCallback} from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity, Linking } from 'react-native';
// Icons8 website url
const icons8Url = 'https://icons8.com/';

const Link = ({url}) => {
  
  // function to direct user to website when the link is pressed 
  const handleLinkPress = useCallback(async () => {
    // check if the link is supported
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // open url in the mobile browser (direct to the browser by exit the application)
      await Linking.openURL(url);
    } else {
      Alert.alert(`URL is not supported: ${url}`);
    }
  }, [url]);

  return(
    <TouchableOpacity onPress={handleLinkPress}>
      <Text style={styles.link}>
        {url}
      </Text>
    </TouchableOpacity>
  )
}

const AboutUsPage = () =>{
  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='About Us Page View'
    >
      <ScrollView>
        <View style={styles.aboutInfo}>
          <Text style={styles.appName}>
            Task Manager Application
          </Text>
          <Text>
           This is a my Final Year Project Task Management Mobile Application. This app allows user to manage their daily task that cooperates the element of user friendly and aesthetics.
          </Text>

          {/*Icons by Icons8 */}
          <View>
            <Text style={styles.title}>
              Icons by Icons8
            </Text>
            {/*touchable link that direct the user to the mealdb website in outer browser view */}
            <Link url={icons8Url}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '8%',
  },
  // app info paragraph styling
  aboutInfo: {
    flex: 1,
    margin: 27,
    marginTop: 20,
  },
  appName: {
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // recipe source styling
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  link: {
    fontSize:15,
    color:'#800080',
  },

});

export default AboutUsPage;
