
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import Card from '../components/card';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { FormField } from '../components/form';
import FriendRequest from '../components/friendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';



const messages = [
  {

    id: 1,
    text: "Hey, how's it going?",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "John",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
  {
    id: 2,
    text: "I'm doing well, thanks! How about you?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Bob",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
  {
    id: 3,
    text: "Good to hear! Just working on a project.",
    createdAt: new Date(),
    user: {
      _id: 3,
      name: "Mark",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
  {
    id: 4,
    text: "Nice, what kind of project?",
    createdAt: new Date(),
    user: {
      _id: 4,
      name: "Harry",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
  {
    id: 5,
    text: "I'm building a navigation app with real-time chat functionality.",
    createdAt: new Date(),
    user: {
      id: 5,
      name: "Dvid",
      avatar: "https://api.dicebear.com/9.x/pixel-art/png",
    },
  },
  {
    id: 6,
    text: "Sounds awesome! Let me know if you need any help.",
    createdAt: new Date(),
    user: {
      _id: 6,
      name: "Bob",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
  {
    id: 7,
    text: "Sounds awesome! Let me know if you need any help.",
    createdAt: new Date(),
    user: {
      _id: 7,
      name: "Methews (mr.Awerson)",
      avatar: "https://api.dicebear.com/9.x/bottts/png?flip=false",
    },
  },
  {
    id: 8,
    text: "Sounds awesome! Let me know if you need any help.",
    createdAt: new Date(),
    user: {
      _id: 8,
      name: "John Doe",
      avatar: "https://api.dicebear.com/9.x/lorelei/png?flip=false",
    },
  },
];



const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '20%', '40%', '90%'], []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handlePress = (user) => {
    router.push({
      pathname: `/chat/${user.id}`,
      params: {
        name: user.user.name,
        avatar: user.user.avatar,
        msg: user.text,
        date: user.createdAt,
      },
    });
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://192.168.253.200:8080/api/public/users/search?q=${searchTerm}`);
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

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
      opacity={0.7}
    />
  ), []);
  const SendRequest = async () => {

    try {
      setIsLoading(true);
      //console.log("\n\nid => ",foundUser.document_Id,"\n\n")
      const userString = await AsyncStorage.getItem('user');
      const user = await JSON.parse(userString);
      const token = user.token;
      // console.log("Token \n =>",token)
      const response = await fetch(`http://192.168.253.200:8080/api/friends/requests?recipientId=${foundUser.document_Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("\n\nreturned data  =",data);
      if (response.ok) {
        alert("Request sent successfully");
        //const data = await response.json();

        setFoundUser(null);
      } else {
        //console.log("Server responded with error:", response);
       // alert("Failed to send request: " + (data.message || 'Unknown error'));
      }

    } catch (error) {
      //console.error("Request failed:", error);
      alert("Something went wrong while sending the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.topFlatlist}>
        <FlatList
          data={messages}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.imgicons, { marginTop: 20, alignItems: 'flex-start' }]}>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <Text style={styles.topListName}>{item.user.name}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <Card
                onpress={() => handlePress(item)}
                name={item.user.name}
                profilePicture={item.user.avatar}
                date={item.createdAt}
              />
              <View style={styles.line} />
            </>
          )}
        />

        <TouchableOpacity onPress={openBottomSheet} style={styles.fabButton}>
          <Image
            source={require("../assets/icons/addChart.png")}
            resizeMode='contain'
            style={styles.fabIcon}
          />
        </TouchableOpacity>

        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.bottomOuter}>
            <ScrollView>
              <FormField
                title='search'
                value={searchTerm}
                handleChangeText={(e) => setSearchTerm(e)}
                style={styles.searchField}
                inputStyle={{ borderBottomColor: '#E6E6E6' }}
              />
              <TouchableOpacity onPress={handleSearch} style={styles.searchIconWrapper}>
                <Image
                  source={require('../assets/icons/search.png')}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>

              {isLoading && <ActivityIndicator size="large" color="#8686DB" style={{ marginTop: 20 }} />}

              {foundUser && (
                <View style={{ width: '100%', marginTop: 20 }}>
                  <FriendRequest
                    addRequest={() => SendRequest()}
                    removeRequest={() => setFoundUser(null)}
                    name={foundUser.fullName}
                    isRequest={false}
                    profile={foundUser.profilePictureUrl || 'https://api.dicebear.com/9.x/lorelei/png'}
                  />
                </View>
              )}
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'grey',
    opacity: 0.1,
  },
  topFlatlist: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    height: 100,
    backgroundColor: '#8686DB',
  },
  imgicons: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 25,
    marginLeft: 20,
  },
  topListName: {
    marginLeft: 30,
    marginTop: 5,
    color: 'white',
  },
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fabIcon: {
    width: 80,
    height: 80,
    alignSelf: 'flex-end',
  },
  searchField: {
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    color: 'black',
  },
  searchIconWrapper: {
    position: 'absolute',
    top: 34,
    right: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  searchIcon: {
    width: 30,
    height: 30,
    tintColor: '#8686DB',
  },
});
