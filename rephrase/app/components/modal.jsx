import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../../firebase';
import { router } from 'expo-router';
const { height } = Dimensions.get('window');
const API_URL = 'https://rephrase-chatapi.onrender.com';

export default function Mymodal({ visible, onClose }) {

  const [isChangeProfile, setIsChangeProfle] = useState(false);
  const [profileImage, seProfileImage] = useState('');
  const [userData, setUserData] = useState(null)
  const [loading,setLoading]= useState(false);
  useEffect(() => {
    loadUser();

  }, [])
  const loadUser = async () => {
    const userDataString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userDataString)
    setUserData(user);
   // console.log("\n\nuser==> ", user);
  };
 

const handleLaunce = async () => {
   setIsChangeProfle(false);
  const userString = await AsyncStorage.getItem('user');
  const user = JSON.parse(userString);
  const Token = user.token;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets?.length) {
    const imageUri = result.assets[0].uri;
    seProfileImage(imageUri); // Assuming this updates UI
    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri:  imageUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(`${API_URL}/api/users/media/profile`, {
        method: 'POST',
        headers: {
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${Token}`,
        },
        body: formData,
      });
         if(response.ok){
         
          alert("apploaded successifully");
          
     // const json = await response.json();
      //console.log('Server Response:', json);
         }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }

   // console.log('Profile URI =>', imageUri);
  }
};

  const logout = async () => {
    router.push('/signin')
    setLoading(true);
    try {
    
      await signOut(FIREBASE_AUTH); // Firebase sign out
      await AsyncStorage.removeItem('token'); // Clear token from storage
    //console.log("signout has been hit")
      router.replace('/signin'); // Navigate to signin screen
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Try again.');
      console.error('Logout error:', error);
    }finally{
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status, granted, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
      console.log("Permission state:", { status, granted, canAskAgain });

      if (status == 'granted') {
       // alert('Sorry, we need camera permissions to make this work!');
        return true;
      }
      return true;
    } catch (err) {
      console.error("Error requesting camera permission:", err);
      return false;
    }
  };

  const handleUseCamera = async () => {
 setIsChangeProfle(false);
   // console.log("handleUseCamera called");
  const userString = await AsyncStorage.getItem('user');
  const user = JSON.parse(userString);
  const Token = user.token;
    const status = await requestCameraPermission();
    console.log("Permission status:", status);

    if (status) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: false,
        exif: true,
        cameraType: ImagePicker.CameraType.front='front',
      });

      if (!result.canceled) {
          const imageUri = result.assets[0].uri;
    seProfileImage(imageUri); // Assuming this updates UI
    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri:  imageUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
       try {

      const response = await fetch(`${API_URL}/api/users/media/profile`, {
        method: 'POST',
        headers: {
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${Token}`,
        },
        body: formData,
      });
         if(response.ok){
         
          alert("apploaded successifully");
          
     // const json = await response.json();
      //console.log('Server Response:', json);
         }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    };
      } else {
        console.log("User canceled camera.");
      }
    }
  };
  const handleSetProfile = () => {
    setIsChangeProfle(!isChangeProfile);
  }
  //displayName": "", "emai
  const name = userData?.displayName || "User";
  return (
    //the modal coming from react native library helps us to easily achieve side bar behavior
    <Modal
      isVisible={visible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0.7}
      onBackdropPress={onClose}

      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        {/*the backgrond layer for profile cover which is startic  */}
        <View style={styles.img_container}>
          <Image
            source={require('../assets/images/profile-bg.png')}
            style={styles.bg_image}
          />
        </View>


        <View style={styles.top_cover}></View>
        <TouchableOpacity onPress={() => { handleSetProfile() }} style={styles.edit_profileImage}>
          <Image
            source={require('../assets/icons/edit-camera.png')}
            style={{ width: 30, height: 30, resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        <View style={styles.profile}>
          <Image
            source={ userData?.photoURL ? { uri: userData.photoURL } : require('../assets/icons/profile.png')}
            style={{ width: 110, height: 110, resizeMode: 'contentFit' }}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={onClose} >
          <Image
            source={require('../assets/icons/close.png')}
            style={{
              resizeMode: 'center',
              width: 25,
              height: 25,
              tintColor: 'white',

            }}
          />

        </TouchableOpacity>
        <Text style={{
          top: 200,
          color: 'grey',

        }}>user infor</Text>
        <View style={styles.infoContainer}>

          <Text style={{ color: '#1B0333' }}>Name  : {name}</Text>
          <Text style={{ color: '#1B0333' }}>Email :{userData ? userData.email : "no email"} </Text>
          <Text style={{ color: '#1B0333' }}>Phone : </Text>


        </View>
        {isChangeProfile && (
          <View style={styles.changingProfile}>
            <TouchableOpacity onPress={handleUseCamera} style={styles.selectionBtn}>
              <Image
                source={require('../assets/icons/take-photo.png')}
                style={{
                  resizeMode: 'contain',
                  width: 60,
                  height: 60,
                }}
              />
              <Text style={{
                color: '#8686DB',
                position: 'absolute',
                top: 60,
                alignSelf: 'center'

              }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLaunce()} style={styles.selectionBtn}>
              <Image
                source={require('../assets/icons/gallery.png')}
                style={{
                  resizeMode: 'contain',
                  width: 60,
                  height: 60,
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
              <Text style={{
                color: '#8686DB',
                position: 'absolute',
                top: 60,
                alignSelf: 'center'

              }}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSetProfile(false)} style={styles.selectionBtn}>
              <Image
                source={require('../assets/icons/cancel.png')}
                style={{
                  resizeMode: 'contain',
                  width: 60,
                  height: 60,
                }}
              />

              <Text style={{
                color: '#8686DB',
                position: 'absolute',
                top: 60,
                alignSelf: 'center'

              }}>Cancel</Text>
            </TouchableOpacity>
        {loading && (
        <ActivityIndicator size="large" color="#8686DB" style={{ marginTop: 20 }} />
          
        )}
          </View>
        )}
        <TouchableOpacity onPress={() => {logout()}} style={styles.logout}>
          <Image
            source={require('../assets/icons/logout.png')}
            style={{ width: 35, height: 45, resizeMode: 'contain', tintColor: 'red' }}
          />
          <Text style={{ color: 'red', fontSize: 20, marginTop: 10 }}>Logout</Text>
        </TouchableOpacity>
      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0, // removes default margin
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: '100%',
    overflow: 'hidden',
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  top_cover: {
    width: 400,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    top: 180,
    marginLeft: -10,
    borderTopLeftRadius: 50,


  },
  btn: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 20,
    left: 20,

  },
  img_container: {
    width: 500,
    height: 200,
    position: 'absolute',
    padding: 0,
    margin: 0,

  },
  bg_image: {
    width: '70%',
    resizeMode: 'cover',
    height: '100%',
    position: 'absolute',
    top: 0,


  },
  profile: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    borderColor: '#8686DB',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  edit_profileImage: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    top: 160,
    left: '70%',
    zIndex: 1,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#8686DB',

  },
  changingProfile: {
    width: '99%',
    height: 100,
    backgroundColor: '#EBF9FF',
    position: 'absolute',
    top: 260,
    alignSelf: 'center',
    zIndex: 11,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: 10,
    shadowOpacity: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 30,

    justifyContent: 'center',

  },
  selectionBtn: {
    width: 60,
    height: 60,
    marginTop: 12
  },
  infoContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#E6E6E6',
    position: 'absolute',
    top: 280,
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    padding: 20,
    justifyContent: 'center',
  },
  logout: {
    width: '100%',
    height: 50,

    position: 'absolute',
    top: '90%',
    left: '10%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
  },
});
