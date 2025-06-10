import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height } = Dimensions.get('window');

export default function Mymodal({ visible, onClose }) {

  const [isChangeProfile, setIsChangeProfle] = useState(false);
  const[profileImage,seProfileImage]=useState('');
  const [userData ,setUserData] = useState([])
   useEffect(() => {
    loadUser();

  }, [])
  const loadUser = async () => {
    const userDataString = await AsyncStorage.getItem('user');
    const user = userDataString ? JSON.parse(userDataString) : null;
    setUserData(user);
  };
  const handleLaunce = async() => {
  
    const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing:true,
       aspect:[1,1],
       quality:1
    });
  
    //console.log(result);
  if (!result.canceled && result.assets?.length) {
      seProfileImage(result.assets[0].uri);
     // console.log("profil ===>  ",profileImage);
    }
  };

 const requestCameraPermission = async () => {
  try {
    const { status, granted, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();
    //console.log("Permission state:", { status, granted, canAskAgain });

    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error requesting camera permission:", err);
    return false;
  }
};

const handleUseCamera = async () => {
  console.log("handleUseCamera called");

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
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      seProfileImage(result.assets[0].uri);
      console.log("Image URI:", result.assets[0].uri);
    } else {
      console.log("User canceled camera.");
    }
  }
};
  const handleSetProfile = () => {
    setIsChangeProfle(!isChangeProfile);
  }
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
            source={profileImage ? {uri:profileImage} : require('../assets/icons/profile.png')}
            style={{ width: 110, height: 110, resizeMode:'cover' }}
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
          top:200,
          color:'grey',

         }}>user infor</Text>
        <View style={styles.infoContainer}>

         <Text style={{color:'#1B0333'}}>Name  : {userData.name? userData.name :"user"}</Text>
         <Text style={{color:'#1B0333'}}>Email :{userData.email} </Text>
         <Text style={{color:'#1B0333'}}>Phone : </Text>


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
            <TouchableOpacity onPress={()=>handleLaunce()} style={styles.selectionBtn}>
              <Image
                source={require('../assets/icons/gallery.png')}
                style={{
                  resizeMode: 'contain',
                  width: 60,
                  height: 60,
                  borderColor:'white',
                  borderWidth:2,
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

          </View>
        )}
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
    overflow:'hidden',
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
  infoContainer:{
    width:'100%',
    height:160,
    backgroundColor:'#E6E6E6',
    position:'absolute',
    top:280,
    alignSelf:'center',
    borderRadius:10,
   display:'flex',
   gap:10,
   padding:20,
   justifyContent:'center',
  },
});
