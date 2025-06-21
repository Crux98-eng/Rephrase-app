import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import FriendRequest from '../components/friendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyFriends from '../components/myFriends';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { custom_colors } from '../utilities/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
const FriendsSreen = () => {
  const url = 'https://rephrase-chatapi.onrender.com';
  const [showFriends, setShowFriens] = useState(true);
  const [isRequests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const handleButton = () => {
    setShowFriens(false);
    getRequests();
    getFriends();
  }
  const profileColors = ['#FFCC00', '#33CC33', '#Ff3399'];


  const assertColors = () => {
    const index = Math.floor(Math.random() * profileColors.length);
    return profileColors[index];
  }
  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
      opacity={0.7}
    />
  ), []);


  useEffect(() => {
    getToken();
    getRequests();
    getFriends();
  }, []);
  const getToken = async () => {
    const userData = await AsyncStorage.getItem('user')
    const user = await JSON.parse(userData);
    const Token = user.token;
    setToken(Token);
  }
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/api/public/users/search?q=${searchTerm}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setFoundUser(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
      setSearchTerm('');
    }
  };
  //hundling request
  const getRequests = async () => {

    try {
      setIsLoading(true);

      const userString = await AsyncStorage.getItem('user');
      const user = await JSON.parse(userString);
      const token = user.token;
      // console.log("Token \n =>",token)
      const response = await fetch(`${url}/api/friends/requests/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });


      if (response.ok) {
        const data = await response.json();
        setRequests(data);
        //console.log("\n\nreturned data =>",data);

      } else {
        console.log("Server responded with error:", response);
      }

    } catch (error) {
      console.error("fetch request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const reMoveUserFromRequestArray = (id) => {
    if (!id) return false;
    const newReQuest = isRequests.filter(user => user.document_Id !== id);
    setRequests(newReQuest);
    return true;
  }
  const confirmRequest = async (document_Id) => {
    //console.log("the point has been hit==>",document_Id);
    //if (!document_Id) { throw new Error("the target id is empty"); return; }
    try {
      setIsLoading(true);
      console.log("\n\n ID", document_Id, "\n\n")
      const response = await fetch(`${url}/api/friends/requests/${document_Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }

      });
      if (response.ok) {
        const data = await response.json();
        if (reMoveUserFromRequestArray(document_Id)) {
          alert("approved");
        } else {
          console.log("somethig went wrong whilst deleting");
        }

      } else {
        alert("bad response");
      }

    } catch (err) {
      throw new Error("bad request : ", err);

    }
    finally {

      setIsLoading(false);
    }
  }
  const getFriends = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/friends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      if (response.ok) {
        const data = await response.json();
        //console.log("returned data =>>",data);
        setFriends(data);
      } else {
        console.log("bad request");
      }

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '20%', '40%', '90%'], []);

  const openBottomSheet = (user) => {
    console.log("User ==>", user);
    setCurrentUser(user);
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.buttonContainer}>
        <Text style={{
          fontFamily: 'Colonna',
          fontSize: 60,
          position: 'absolute',
          top: 30,
          alignSelf: 'center',
          color: 'white',
        }}>Friends</Text>
        {/* buttons to decide what to display */}
        <TouchableOpacity onPress={() => setShowFriens(true)} style={styles.btn1}>
          <Text style={{ color: 'white' }}>find friends</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButton()} style={styles.btn2}>
          <Text>Your Friends</Text></TouchableOpacity>
      </View>
      {/* conditonal rendering based on the button */}
      {showFriends &&
        (
          <View style={styles.findFriend}>
            {isRequests.map((user) => (

              <View key={user.document_Id}>

                <FriendRequest
                  name={user.fullName}
                  confirmRequest={() => { confirmRequest(user.document_Id) }}
                  isRequest={true}
                  Color={assertColors()}
                />
              </View>
            ))

            }
            {isLoading &&
              <View style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',

              }}>
                <Image
                  source={require('../assets/icons/loading-bg.png')}
                  style={{ width: '100%', height: '100%' }}
                />
                <ActivityIndicator
                  size="large"
                  color="#8686DB"
                  style={{
                    marginTop: 20,
                    transform: [{ scale: 2 }],
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  }} />

              </View>}


          </View>
        )
      }
      {!showFriends && (
        <View style={{ flex: 1,}}>
          <FlatList
            data={friends}
            scrollEnabled={true}
            keyExtractor={(item) => item.document_Id.toString()}
            renderItem={({ item }) => (
              <MyFriends
                pressed={() => openBottomSheet(item)}
                name={item.fullName}
                profilePic={item.profilePictureUrl}
                Color={assertColors()}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }} // if you have a FAB or bottom tab
          />
        </View>


      )
      }
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.bottomOuter}>
          <ScrollView>
            <View style={styles.userProfile}>
              <Image
                style={{ width: 150, height: 150 }}
                source={currentUser.profilePictureUrl ? { uri: profilePictureUrl } : require('../assets/icons/profile.png')}
              />
            </View>
            <Text style={{ fontSize: 18, color: 'grey', marginLeft: 40, marginTop: 10 }} >Name  :<Text style={{ color: 'blue' }}> {currentUser.fullName}</Text></Text>
            <Text style={{ fontSize: 18, color: 'grey', marginLeft: 40, marginTop: 10 }} >Email : <Text style={{ color: 'blue' }}>{currentUser.emailAddress}</Text></Text>
            <Text style={{ fontSize: 18, color: 'grey', marginLeft: 40, marginTop: 10 }} >Phone : <Text style={{ color: 'blue' }}>{currentUser.phoneNumber}</Text></Text>


          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default FriendsSreen;

const styles = StyleSheet.create({
  btn1: {
    fontSize: '24pt',
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: '#fff',
  },
  btn2: {
    fontSize: '24pt',
    backgroundColor: '#FFCC00',
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: '#0000'

  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 200,
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    backgroundColor: custom_colors.primary_dark,
    borderBottomLeftRadius: 50,
  },
  findFriend: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6E6E6',
    gap: 3,
  },
  myFriends: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6E6E6',
    gap: 3,

  },
  userProfile: {
    width: '90%',
    height: 200,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,

  },

});