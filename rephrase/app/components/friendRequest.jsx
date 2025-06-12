// import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import React from 'react'

// const FriendRequest = ({ name, isRequest, profile }) => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity>
//                 <View style={styles.profile}>
//                     <Image
//                         source={profile ? { uri: profile } : require('../assets/icons/profile.png')}
//                         style={{ width: 60, height: 60,  }}
//                     />
//                 </View>
//                 <Text style={styles.names} >{name}</Text>
//             </TouchableOpacity>
//             {isRequest && (
//                 <View style={styles.btn}>
//                     <TouchableOpacity style={styles.button}>
//                         <Text style={{ color: 'blue' }}>Confirm</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button}>
//                         <Text style={{ color: 'blue' }}>Cancel</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//             {!isRequest && (
//                 <View style={styles.btn}>
//                     <TouchableOpacity style={styles.button}>
//                         <Text style={{ color: 'blue' }}>Add</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button}>
//                         <Text style={{ color: 'blue' }}>Remove</Text>
//                     </TouchableOpacity>

//                 </View>

//             )
//             }
//         </View>
//     )
// }

// export default FriendRequest

// const styles = StyleSheet.create({
//     container: {

//         backgroundColor: '#E6E6E6',
//         width: '100%',
//         height: 120,
//         justifyContent: 'center',
//         shadowColor: 'grey',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 1,
//         elevation: 1,

//     },
//     names: {
//         position: 'absolute',
//         marginLeft: 130,
//         fontSize: 24,
//         color: 'black',

//     },
//     btn: {
//         width: 300,
//         height: 50,
//         zIndex: 1,
//         display: 'flex',
//         marginLeft: 130,
//         flexDirection: 'row',
//         gap: 20,
//         position: 'absolute',
//         marginTop: 40,
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     button: {
//         backgroundColor: '#E6E6E6',
//         paddingHorizontal: 50,
//         paddingVertical: 8,
//         borderRadius: 5,
//         shadowColor: 'black',
//         shadowOffset: { width: 2, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 3.5,
//         elevation: 5,


//     },
//     profile: {

//         backgroundColor: '#8686DB',
//         width: 80,
//         height: 80,
//         borderRadius: '50%',
//         left: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'hidden',


//     },

// })
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

const messages = [
  //... unchanged dummy message list
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
      const response = await fetch(`http://192.168.35.200:8080/api/public/users/search?q=${searchTerm}`);
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
