
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import Card from '../components/card';
import { router } from 'expo-router';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import FriendRequest from '../components/friendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { custom_colors } from '../utilities/colors';
import Mymodal from '../components/modal';
const API_URL = 'https://rephrase-chatapi.onrender.com';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [foundSearch, setFoundSearch] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '20%', '40%', '90%'], []);
  const profileColors = ['#FFCC00', '#33CC33', '#Ff3399'];


  const assertColors = () => {
    const index = Math.floor(Math.random() * profileColors.length);
    return profileColors[index];
  }
  useEffect(() => {
    getFriends();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };


  const handlePress = useCallback((user) => {
    router.push({
      pathname: `/chat/${user.document_Id}`,
      params: { name: user.fullName,
              avatar:user.profilePictureUrl
       }
    });
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setFoundSearch(false);
    try {
      const response = await fetch(`${API_URL}/api/public/users/search?q=${searchTerm}`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setFoundUser(data[0]);
        //console.log("\n\nsearched users ==>", data[0], "\n\n")
      } else {
        setFoundSearch(true);
      }
    } catch {
      setFoundSearch(true);
    } finally {
      setIsLoading(false);
      setSearchTerm('');
    }
  }, [searchTerm]);

  const SendRequest = useCallback(async () => {
    if (!foundUser) return;

    try {
      setIsLoading(true);
      const userString = await AsyncStorage.getItem('user');
      const { token } = JSON.parse(userString);
      const res = await fetch(`${API_URL}/api/friends/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId: foundUser.document_Id }),
      });

      if (res.ok) {
        alert("Request sent successfully");
        setFoundUser(null);
      } else {
        const err = await res.json();
        alert("Failed to send request: " + (err?.message || 'Unknown error'));
      }
    } catch {
      alert("Something went wrong while sending the request.");
    } finally {
      setIsLoading(false);
    }
  }, [foundUser]);

  const getFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      const userString = await AsyncStorage.getItem('user');
      const { token } = JSON.parse(userString);
      const response = await fetch(`${API_URL}/api/friends`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      }
    } catch { }
    finally {
      setIsLoading(false);
    }
  }, []);

  const renderFriendAvatar = ({ item }) => (
    <View style={styles.imgicons}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image
          source={item.profilePictureUrl ? { uri: item.profilePictureUrl }
           : require('../assets/icons/profile.png')}
          style={[item.profilePictureUrl ?styles.avatar:{ tintColor: 'white' }]} f
        />
      </TouchableOpacity>
      <Text style={styles.topListName}>{item.fullName}</Text>
    </View>
  );

  const renderFriendCard = ({ item }) => (
    <>

      <Card
        color={assertColors()}
        onpress={() => handlePress(item)}
        name={item.fullName}
        profilePicture={item.profilePictureUrl}
      />
      <View style={styles.line} />
    </>
  );

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      pressBehavior="close"
      opacity={0.7}
    />
  ), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setShowmodal(true)} style={styles.menu}>
          <Image

            source={require('../assets/icons/menueBars.png')}
            style={{ width: 32, height: 23 }}

          />
        </TouchableOpacity>
        <View style={styles.topFlatlist}>
          <FlatList
            data={friends}
            horizontal
            keyExtractor={(item) => item.document_Id}
            renderItem={renderFriendAvatar}
          />
          {!friends.length && (
            <View style={styles.noFriendsContainer}>
              <Text style={styles.noFriendsText}>
                You have no user. Click the plus and search for your friend
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.downContainer}>
        <View style={styles.container}>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.document_Id}
            renderItem={renderFriendCard}
          />

          <TouchableOpacity onPress={openBottomSheet} >
            <Image
              source={require("../assets/icons/plus.png")}
              resizeMode='contain'
              style={styles.fabIcon}
            />
          </TouchableOpacity>
        </View>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={[styles.bottomOuter]}>
            <ScrollView style={{ width: '100%' }}>
              <TextInput
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder='Search for a friend'
                placeholderTextColor="#aaa"


              />
              <TouchableOpacity onPress={handleSearch} style={styles.searchIconWrapper}>
                <Image
                  source={require('../assets/icons/search.png')}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>

              {isLoading && (
                <ActivityIndicator size="large" color="#8686DB" style={{ marginTop: 20 }} />
              )}

              {foundUser && (
                <View style={{ width: '100%', marginTop: 20 }}>
                  <FriendRequest
                    addRequest={SendRequest}
                    removeRequest={() => setFoundUser(null)}
                    name={foundUser.fullName}
                    isRequest={false}
                    profile={foundUser.profilePictureUrl || 'https://api.dicebear.com/9.x/lorelei/png'}
                  />
                </View>
              )}

              {foundSearch && (
                <View style={styles.notFoundContainer}>
                  <Text style={styles.notFoundText}>User not found</Text>
                </View>
              )}
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <Image
              source={require('../assets/icons/loading-bg.png')}
              style={styles.loadingImage}
            />
            <ActivityIndicator size="large" color="#8686DB" style={styles.loadingSpinner} />
          </View>
        )}
      </View>

      {showModal && (
        <View style={{ margin: 0, padding: 0 }}>
          <Mymodal visible={showModal} onClose={() => setShowmodal(false)} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // backgroundColor: '#fff',
  },

  // Top Horizontal List (Avatars)
  topFlatlist: {
    width: '90%',
    height: 100,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    backgroundColor: custom_colors.primary_light,
    borderRadius: 15,
    padding: 10,
    shadowColor: 'white',
    elevation: 5,

  },

  topContainer: {
    width: '100%',
    height: 300,
    backgroundColor: custom_colors.primary_dark,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,

  },
  downContainer: {
    width: '100%',
    height: '500',
    backgroundColor: custom_colors.secondary,
    position: 'absolute',
    top: 250,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 20,
    alignItems: 'center',


  },
  imgicons: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,

    borderRadius: 25,
  },
  topListName: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },
  menu: {
    alignSelf: 'flex-start',
    marginLeft: 26,
    marginBottom: 20,
  },
  noFriendsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noFriendsText: {
    fontSize: 14,
    color: 'white',
    fontStyle: 'italic',
  },


  fabIcon: {
    width: 50,
    height: 50,
    tintColor: custom_colors.primary_dark,
    
   left:'85%',
  },

  // Bottom Sheet
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
   borderTopRightRadius: 16,
 
    // 
    // position:'absolute',
  },
  bottomOuter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    width: '100%',
   
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 60,
    width:'80%',
    marginBottom: 10,
    marginRight: 40,
  },
  searchIconWrapper: {
    right:10,
    marginBottom: 20,
    marginRight: 10,
    zIndex: 10,
    backgroundColor: 'white',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'absolute',
    top: 20,
  },
  searchIcon: {
    width: 40,
    height: 40,
    tintColor: '#8686DB',

  },

  notFoundContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },

  // Friend List Cards
  line: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: 10,
  },

  // Loading Overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.15,
  },
  loadingSpinner: {
    zIndex: 1000,
  },
});
