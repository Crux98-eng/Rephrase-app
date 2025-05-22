import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample chat data initial state
const initialData = {
  message_id_1: {
    sender_user_id: 'unique_firebase_uid_of_user_alice',
    sender_display_name: 'Alice (the amazing)',
    message_content: "Hello everyone! Let's start chatting!",
    sent_timestamp_ms: 1700000010000,
  },
  message_id_2: {
    sender_user_id: 'unique_firebase_uid_of_user_bob',
    sender_display_name: 'Bob the Builder',
    message_content: 'Hey Alice! Sounds like a plan. Excited to try this out.',
    sent_timestamp_ms: 1700000011000,
  },
};

const ChatScreen = () => {
  // logged in user coming from main screen
  const { userId, name } = useLocalSearchParams(); 
 

  const [chatMessages, setChatMessages] = useState(initialData);
  const [inputText, setInputText] = useState('');

  const messages = useMemo(() => {
    const entries = Object.entries(chatMessages).map(([id, msg]) => ({
      id,
      ...msg,
    }));
    return entries.sort((a, b) => a.sent_timestamp_ms - b.sent_timestamp_ms);
  }, [chatMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newId = `msg_${Date.now()}`;
    const newMessage = {
      sender_user_id: userId,
      sender_display_name: name || 'Me',
      message_content: inputText,
      sent_timestamp_ms: Date.now(),
    };

    setChatMessages((prev) => ({
      ...prev,
      [newId]: newMessage,
    }));

    setInputText('');
  };

  const renderMessage = ({ item }) => {
    const isMine = item.sender_user_id === userId;

    return (
      <View style={[styles.messageContainer, isMine ? styles.mine : styles.theirs]}>
        {!isMine && (
          <Text style={styles.senderName}>{item.sender_display_name}</Text>
        )}
        <Text style={styles.messageText}>{item.message_content}</Text>
      </View>
    );
  };
const handleBack=()=>{
  router.push('/home');
  console.log("pressed");
}
  return (
 
    <View style={styles.container}>
      <Image 
      source={require("../assets/icons/chatbg.png")}
      style={styles.imageBg}
      
      />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image 
          source={require("../assets/icons/left-arrow.png")}
           resizeMode='contentFit'
          />
        </TouchableOpacity>
        <Text style={{color:'white',textAlign:'center'}}>{name}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    
  },
  backButton:{
    display:'flex',
    position:'absolute',
    left:20,
    top:40,
   width:40,
   justifyContent:'center',
   alignContent:'center',
   height:40,
  
   padding:5,
  },
  imageBg:{
   flex:1,
  
   justifyContent:'center',
   width:'100%',
   height:'100%',
   position:'absolute'


  },
  topBar:{
    width:'100%',
    height:100,
     marginTop:25,
    backgroundColor:'#1B0333',
    shadowColor:'black',
    justifyContent:'center',
    position:'fixed',
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 80,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
  },
  mine: {
    backgroundColor: '#000066',
    alignSelf: 'flex-end',
  },
  theirs: {
    backgroundColor: '#FF8C00',
    alignSelf: 'flex-start',
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1B0333',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#1B0333',
    paddingHorizontal: 20,
    marginLeft: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 