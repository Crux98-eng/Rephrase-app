import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample chat data initial state


const ChatScreen = () => {
  // logged in user coming from main screen
  const { userId, name, msg, date, avatar } = useLocalSearchParams();

  // console.log("avata  ==>", avatar)
  const [id, setId] = useState('');
  const initialData = {
    message_id_1: {
      received_id: userId,
      sender_display_name: name,
      message_content: msg,
      sent_timestamp_ms: date,
    },

  };
  useEffect(() => {
    loadUser();

  }, [])
  const loadUser = async () => {
    const userDataString = await AsyncStorage.getItem('user');
    const user = userDataString ? JSON.parse(userDataString) : null;
    //console.log("User ===>",user);
    setId(user.uid)
  };

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
      sender_user_id: id,
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
    const isMine = item.sender_user_id === id;

    return (
      <View style={[styles.messageContainer, isMine ? styles.mine : styles.theirs]}>
        {!isMine && (
          <Text style={styles.senderName}>{item.sender_display_name}</Text>
        )}
        <Text style={styles.messageText}>{item.message_content}</Text>
      </View>
    );
  };
  const handleBack = () => {
    router.push('/home');

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
        <View style={{
          backgroundColor: '#8686DB',
          borderColor: 'white',
          borderWidth: 2,
          width: 50, height: 50,
          borderRadius: '50%',
          alignSelf: 'center',
          marginTop: 10,
          alignItems: 'center',
        }}>

          <Image
            source={{ uri: avatar }}
            resizeMode='contentFit'
            style={{
              width: 40,
              height: 40
            }}
          />
        </View>
        <Text style={{ color: 'white', alignSelf: 'center', marginTop: 6 }}>{name}</Text>
      </View>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />
</KeyboardAvoidingView>
      <View style={styles.inputContainer}  >
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
  backButton: {
    display: 'flex',
    position: 'absolute',
    left: 10,
    top: 40,
    width: 40,
    justifyContent: 'center',
    alignContent: 'center',
    height: 40,

    padding: 5,
  },
  imageBg: {
    flex: 1,

    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute'


  },
  topBar: {
    width: '100%',
    height: 100,
    marginTop: 25,
    backgroundColor: '#1B0333',
    shadowColor: 'black',
    justifyContent: 'center',
    position: 'fixed',

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
