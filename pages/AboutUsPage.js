import React, { useCallback} from 'react';
import { StyleSheet, Text, View, Pressable, Linking, Alert } from 'react-native';
// Icons8 website url
const icons8Link = 'https://icons8.com/';

const Link = ({url}) => {
  // to handle the link pressed by user
  // to direct user to the external browser when the link is pressed 
  const handleLinkPress = useCallback(async () => {
    // checks whether the link is support
    const supported = await Linking.canOpenURL(url);

    if (supported) 
    {
      await Linking.openURL(url);
    } else 
    {
      Alert.alert(`URL is not supported: ${url}`);
    }
  }, [url]);

  return(
    <Pressable onPress={handleLinkPress}>
      <Text style={styles.icons8Link}>
        {url}
      </Text>
    </Pressable>
  )
}

// simple description of my application
const AboutUsPage = () =>{
  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='About Us Page View'
    >
      <View>
        <Text style={styles.appName}>
          Task Manager Application
        </Text>
        <Text style={styles.appDescrip}>
          This is a my Final Year Project Task Management Mobile Application. 
          This app allows user to manage their daily task that cooperates the element of user 
          friendly and aesthetics.
        </Text>
        <Text style={styles.websiteName}>
          Icons by Icons8
        </Text>
        <Link url={icons8Link}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: '10%',
    paddingHorizontal: '7%',
  },
  appName: {
    marginBottom: 18,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appDescrip: {
    fontSize: 16,
  },
  websiteName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  icons8Link: {
    fontSize: 16,
    color: '#800080',
  },
});

export default AboutUsPage;
