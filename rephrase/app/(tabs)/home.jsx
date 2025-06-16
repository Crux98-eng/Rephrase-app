
// import {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   FlatList,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
// import Card from '../components/card';
// import { router } from 'expo-router';
// import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import { FormField } from '../components/form';
// import FriendRequest from '../components/friendRequest';
// import AsyncStorage from '@react-native-async-storage/async-storage';






// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [foundUser, setFoundUser] = useState(null);
//   const [friends,setFriends] = useState([]);
//   const bottomSheetRef = useRef(null);
//   const [foundSearch,setFoundSearch]=useState(false);
//   const snapPoints = useMemo(() => ['1%', '20%', '40%', '90%'], []);
//   const url = 'https://rephrase-chatapi.onrender.com'

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.expand();
//   };

//   const handlePress = (user) => {
//     router.push({
//       pathname: `/chat/${user.document_Id}`,
//       params: {
//         name: user.fullName,
        
//       },

//     });
//   };
//   useEffect(()=>{
//   getFriends();
//   },[])

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) return;
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${url}/api/public/users/search?q=${searchTerm}`);
//       if (!response.ok) throw new Error('Search failed');
//       const data = await response.json();
//       //console.log("\n\n DataSerach ==>",data,"\n\n")
       
//     if (data.length > 0) {
//       setFoundUser(data[0]); // store the first object
      
//     }
//     if(!response.ok){
//      setFoundSearch(true);
//     }
    
 
     
//     } catch (error) {
//       //console.error('Search error:', error);
//     } finally {
//       setIsLoading(false);
//       setSearchTerm('');
//     }
//   };

//   const renderBackdrop = useCallback((props) => (
//     <BottomSheetBackdrop
//       {...props}
//       disappearsOnIndex={-1}
//       appearsOnIndex={0}
//       pressBehavior="close"
//       opacity={0.7}
//     />
//   ), []);
//   const SendRequest = async () => {

//     try {
//       setIsLoading(true);
//       //console.log("\n\nid => ",foundUser.document_Id,"\n\n")
//       const userString = await AsyncStorage.getItem('user');
//       const user = JSON.parse(userString);
//       const Token = user.token;
//        //console.log("Doc token \n =>",Token)
//       const response = await fetch(`${url}/api/friends/requests`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${Token}`,
//         },
//          body: JSON.stringify({
//           "recipientId":foundUser.document_Id,
//         })
//       });

//       console.log("\n\nreturned respose  =",response);
//       if (response.ok) {
//         alert("Request sent successfully");
//         //const data = await response.json();

//         setFoundUser(null);
//       } else {
//         //console.log("Server responded with error:", response);
//         alert("Failed to send request: " + (data.message || 'Unknown error'));
//       }

//     } catch (error) {
//       //console.error("Request failed:", error);
//       alert("Something went wrong while sending the request.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
// const getFriends = async () => {
//     try {
//       setIsLoading(true);
//       const userString = await AsyncStorage.getItem('user');
//       const user = await JSON.parse(userString);
//       const token = user.token;
//       const response = await fetch(`${url}/api/friends`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       if (response.ok) {
//         const data = await response.json();
//        // console.log("returned data =>>",data);
//         setFriends(data);
//       } else {
//         console.log("bad request");
//       }

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={styles.topFlatlist}>
//         <>
//         <FlatList
//           data={friends}
//           horizontal
//           keyExtractor={(item) => item.document_Id.toString()}
//           renderItem={({ item }) => (
//             <View style={[styles.imgicons, { marginTop: 20, alignItems: 'flex-start' }]}>
//               <TouchableOpacity onPress={() => handlePress(item)}>
//                 <Image
//                   source={item.profilePictureUrl?{ uri: item.profilePictureUrl }:require('../assets/icons/profile.png')}
//                   style={styles.avatar}
//                 />
//               </TouchableOpacity>
//               <Text style={styles.topListName}>{item.fullName}</Text>
//             </View>
//           )}
//         />
//          { !friends.length > 0 && (
//           <View style={{width:'100%',height:100,
//           backgroundColor:'#8686DB',
//           justifyContent:'center',
//           alignItems:'center',
//           padding:10,
//           }}>
//             <Text style={{color:'white',fontSize:24}}>You have no user. Click the plus and search for your friend</Text>
//           </View>
//          )}
//        </>
//       </View>

//       <View style={styles.container}>
//         <FlatList
//           data={friends}
//           keyExtractor={(item) => item.document_Id.toString()}
//           renderItem={({ item }) => (
//             <>
//               <Card
//                 onpress={() => handlePress(item)}
//                 name={item.fullName}
//                 profilePicture={item.profilePictureUrl}
               
//               />
//               <View style={styles.line} />
//             </>
//           )}
//         />
        

//         <TouchableOpacity onPress={openBottomSheet} style={styles.fabButton}>
//           <Image
//             source={require("../assets/icons/addChart.png")}
//             resizeMode='contain'
//             style={styles.fabIcon}
//           />
//         </TouchableOpacity>

//         <BottomSheet
//           index={-1}
//           ref={bottomSheetRef}
//           snapPoints={snapPoints}
//           style={styles.bottomSheet}
//           backdropComponent={renderBackdrop}
//         >
//           <BottomSheetView style={styles.bottomOuter}>
//             <ScrollView>
//               <FormField
//                 title='search'
//                 value={searchTerm}
//                 handleChangeText={(e) => setSearchTerm(e)}
//                 style={styles.searchField}
//                 inputStyle={{ borderBottomColor: '#E6E6E6' }}
//               />
//               <TouchableOpacity onPress={handleSearch} style={styles.searchIconWrapper}>
//                 <Image
//                   source={require('../assets/icons/search.png')}
//                   style={styles.searchIcon}
//                 />
//               </TouchableOpacity>

//               {isLoading && <ActivityIndicator size="large" color="#8686DB" style={{ marginTop: 20 }} />}

//               {foundUser && (
               

//                  <View   style={{ width: '100%', marginTop: 20 }}>
//                   <FriendRequest
//                     addRequest={() => SendRequest()}
//                     removeRequest={() => setFoundUser(null)}
//                     name={foundUser.fullName}
//                     isRequest={false}
//                     profile={foundUser.profilePictureUrl || 'https://api.dicebear.com/9.x/lorelei/png'}
//                   />
//                 </View>
              
             
//               )
//               }
            
              
//               {foundSearch && (
//                 <View style={{width:'100%',height:100,justifyContent:'center',alignItems:'center',marginTop:90}}>
//                   <Text style={{color:'red',fontSize:18}}>user not found</Text>
//                 </View>
//               ) }
//             </ScrollView>
//           </BottomSheetView>
//         </BottomSheet>
//         {isLoading &&
//                       <View style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         backgroundColor: 'white',
        
//                       }}>
//                         <Image
//                           source={require('../assets/icons/loading-bg.png')}
//                           style={{ width: '100%', height: '100%' }}
//                         />
//                         <ActivityIndicator
//                           size="large"
//                           color="#8686DB"
//                           style={{
//                             marginTop: 20,
//                             transform: [{ scale: 2 }],
//                             width: '100%',
//                             height: '100%',
//                             position: 'absolute',
//                           }} />
        
//                       </View>}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#fff',
//   },
//   line: {
//     width: '100%',
//     height: 2,
//     backgroundColor: 'grey',
//     opacity: 0.1,
//   },
//   topFlatlist: {
//     width: '100%',
//     alignSelf: 'center',
//     marginTop: 0,
//     height: 100,
//     backgroundColor: '#8686DB',
//   },
//   imgicons: {
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     backgroundColor: 'white',
//     borderRadius: 25,
//     marginLeft: 20,
//   },
//   topListName: {
//     marginLeft: 30,
//     marginTop: 5,
//     color: 'white',
//   },
//   fabButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
//   fabIcon: {
//     width: 80,
//     height: 80,
//     alignSelf: 'flex-end',
//   },
//   searchField: {
//     backgroundColor: '#E6E6E6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 10,
//     color: 'black',
//   },
//   searchIconWrapper: {
//     position: 'absolute',
//     top: 34,
//     right: '8%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 50,
//   },
//   searchIcon: {
//     width: 30,
//     height: 30,
//     tintColor: '#8686DB',
//   },
// });
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
import { FormField } from '../components/form';
import FriendRequest from '../components/friendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://rephrase-chatapi.onrender.com';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const [foundSearch, setFoundSearch] = useState(false);
  const [friends, setFriends] = useState([]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1%', '20%', '40%', '90%'], []);

  useEffect(() => {
    getFriends();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handlePress = useCallback((user) => {
    router.push({
      pathname: `/chat/${user.document_Id}`,
      params: { name: user.fullName }
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
    } catch {}
    finally {
      setIsLoading(false);
    }
  }, []);

  const renderFriendAvatar = ({ item }) => (
    <View style={styles.imgicons}>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Image
          source={item.profilePictureUrl ? { uri: item.profilePictureUrl } : require('../assets/icons/profile.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.topListName}>{item.fullName}</Text>
    </View>
  );

  const renderFriendCard = ({ item }) => (
    <>
      <Card
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

      <View style={styles.container}>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.document_Id}
          renderItem={renderFriendCard}
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
                title='Search'
                value={searchTerm}
                handleChangeText={setSearchTerm}
                style={styles.searchField}
                inputStyle={{ borderBottomColor: '#E6E6E6' }}
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
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },

  // Top Horizontal List (Avatars)
  topFlatlist: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    backgroundColor:'#8686DB',
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
  noFriendsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noFriendsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },

  // FAB Button
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    width: 80,
    height: 80,
    
  },

  // Bottom Sheet
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  bottomOuter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  searchField: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  searchIconWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight:30,
    tintColor: '#8686DB',
   marginTop:-60,
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
