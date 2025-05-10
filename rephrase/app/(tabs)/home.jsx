import { StyleSheet, Text, View,FlatList, SafeAreaView,ScrollView} from 'react-native'
import React, { useState } from 'react'
import Card from '../components/card';
import { router } from 'expo-router';


const messages = [
  {
    id: 1,
    text: "Hey, how's it going?",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Alice",
      avatar: "https://example.com/avatar1.jpg",
    },
  },
  {
    id: 2,
    text: "I'm doing well, thanks! How about you?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Bob",
      avatar: "https://example.com/avatar2.jpg",
    },
  },
  {
    id: 3,
    text: "Good to hear! Just working on a project.",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "Alice",
      avatar: "https://example.com/avatar1.jpg",
    },
  },
  {
    id: 4,
    text: "Nice, what kind of project?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Bob",
      avatar: "https://example.com/avatar2.jpg",
    },
  },
  {
    id: 5,
    text: "I'm building a navigation app with real-time chat functionality.",
    createdAt: new Date(),
    user: {
      id: 1,
      name: "Alice",
      avatar: "https://example.com/avatar1.jpg",
    },
  },
  {
    id: 6,
    text: "Sounds awesome! Let me know if you need any help.",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "Bob",
      avatar: "https://example.com/avatar2.jpg",
    },
  },
];

const Home = () => {
  const [name,setName]=useState('')
 
  const handePress=(User)=>{
   //console.log("user ",User);
   router.push(`/chat/${User.id}`
 );
   }
  return (
   <SafeAreaView style={{flex:1,backgroundColor:'#ffff'}}>

    <View style={styles.container}>
   
     <FlatList
        data={messages}
        renderItem={({item}) => {
         return(
          <>
      
        <Card 
      
          
          onpress= {()=> handePress(item)}
          name={item.user.name}
          
          profilePicture={item.user.avatar}
          date={item.createdAt}
          
          />
          <View style={styles.line}></View>
          </>
         )
    
        }}
        keyExtractor={(item)=> item.id}
      />
</View>

</SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
container:{
  flex:1,
  width:'100%',
  height:'100%',
  backgroundColor:'#fff',
},
line:{
  width:'100%',
  height:2,
  backgroundColor:'grey',
  opacity:0.1,
}

})