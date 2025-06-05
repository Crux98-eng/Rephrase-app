import { StyleSheet, Image, Text, View, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import Card from '../components/card';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import { FormField } from '../components/form'
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
  const [name, setName] = useState('')

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['1', '20%', '40%', '90%'], []);
  const openBottomSheet = () => {
    if (bottomSheetRef.current) bottomSheetRef.current.expand();
  };
  const handlePress = (user) => {
    // Encode name and avatar in query params

   // console.log("==============", user.user.avatar)
    router.push({
      pathname: `/chat/${user.id}`,
      params: {
        name: user.user.name,
        avatar: user.user.avatar,
        msg:user.text,
        date:user.createdAt
      },
    });
  };
  const topHandlePress = (user) => {
    // Encode name and avatar in query params
    //console.log("==============",user)
    router.push({
      pathname: `/chat/${user.id}`,
      params: {
        name: user.user.name,
        avatar: user.user.avatar,
        msg:user.text,
        date:user.createdAt
      },
    });
  };
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}    // Fully disappears when sheet is closed
        appearsOnIndex={0}        // Appears as soon as sheet is opened
        pressBehavior="close"     // Closes sheet when tapping backdrop
        opacity={0.7}             // Darkness level
      />
    ),
    []



    



  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>

      <View style={styles.topFlatlist}>
        <FlatList

          data={messages}
          renderItem={({ item }) => {
            return (
              <View style={[styles.imgicons, { display: 'flex', alignItems: 'start', marginTop: 20 }]}>
                <TouchableOpacity onPress={()=>topHandlePress(item)}>
                <Image
                  source={{uri:item.user.avatar}}
                  style={{
                    width: 50, height: 50,
                    resizeMode: 'contain',
                    backgroundColor: 'white',
                    borderRadius: 50,
                    marginLeft: 20,

                  }}

                />
                </TouchableOpacity>
                <Text style={{ marginLeft: 30, marginTop: 5, color: 'white' }}>{item.user.name}</Text>
              </View>
            )

          }}
          horizontal
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.container}>
 

        <FlatList
          data={messages}
          renderItem={({ item }) => {
            return (
              <>
                <Card
                  onpress={() => handlePress(item)}
                  name={item.user.name}
                  profilePicture={item.user.avatar}
                  date={item.createdAt}
                />
              
                <View style={styles.line}>
                  
                </View>
              </>
            )
          }}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity onPress={() => openBottomSheet()} style={{ backgroundColor: 'transparent', position: 'fixed', alignSelf: 'flex-end', width: 90, height: 90 }}>
          <Image
            source={require("../assets/icons/addChart.png")}
            resizeMode='contentFit'
            style={{
              width: 80,
              height: 80,
              alignSelf: 'flex-end',

            }}

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
                title='T0:'
                value=''
                handleChangeText={() => { }}
                style={{
                  backgroundColor: '#E6E6E6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 10,
                  color: 'black'


                }}
                inputStyle={{ borderBottomColor: '#E6E6E6' }}

              />
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
      </View>

    </SafeAreaView>
  )
}

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
    borderTopRightRadius: 'back',
    backgroundColor: '#8686DB',

  },
  imgicons: {

  },


})