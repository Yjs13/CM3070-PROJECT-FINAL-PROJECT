import { StyleSheet, Text, View, TextInput, Pressable, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';

const SecurePageView = () =>{
  const [importantText, setImpText] = useState('');

  useEffect(()=> {
    const getSavedMaterials = async () => {
        try{
            // retrieve the password data from the storage
            const savedMaterials = await AsyncStorage.getItem('importantData');
            const matData = JSON.parse(savedMaterials);
            setImpText(matData);
        }catch(e){
            console.error(e);
        }
    }
    getSavedMaterials();
  },[])

  const saveSecureMaterial= async()=> {
    // store the important data to the storage
    await AsyncStorage.setItem('importantData', JSON.stringify(importantText));
    Alert.alert('You have saved the data');
  }

  return (
    <View 
      style={styles.container}
      accessible={true} 
      accessibilityLabel='Secure Page View'
    >
      <View style={styles.secureInfoView}>
        <TextInput
          multiline
          placeholder='Important Notes'
          defaultValue={importantText}
          style= {styles.secureContainer}
          onChangeText= {importantText => setImpText(importantText)}
        />
        <Pressable style={styles.saveButton} onPress={saveSecureMaterial}>
            <Text style={styles.saveButtonText}>
                Save
            </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fbeed7',
  },
  secureInfoView: {
    margin: '5%',
  },
  secureContainer: {
    fontSize: 16,
  },

  // save button styling
  saveButton: {
    width: '30%',
    marginTop: 40,
    padding: 8,
    backgroundColor: '#800080', 
    borderRadius: 8,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }

});

export default SecurePageView;
