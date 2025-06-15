
import React, { useEffect, useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const { userId, name } = useLocalSearchParams();
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadUser();
    getMessages();
  }, []);

  const loadUser = async () => {
    const userDataString = await AsyncStorage.getItem('user');
    const user = userDataString ? JSON.parse(userDataString) : null;
    setId(user.uid);
  };

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const token = user.token;
      const response = await fetch(`http://192.168.253.200:8080/api/chat/messages/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setChatMessages(data);
      }
    } catch (err) {
      console.log("Error fetching messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    const token = user.token;
    try {
      setIsLoading(true);
      const response = await fetch('http://192.168.253.200:8080/api/chat/messages/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: userId,
          senderId: id,
          text: inputText,
        })
      });

      const newMessage = {
        senderId: id,
        receiverId: userId,
        message: inputText,
        mediaUrl: null,
        messageId: `msg_${Date.now()}`,
        status: 'SENT',
        timestamp: Date.now(),
        type: 'TEXT'
      };

      if (response.ok) {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');
      } else {
        console.log("Message not sent");
      }
    } catch (err) {
      console.log("Send error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedMessages = useMemo(() => {
    return [...chatMessages].sort((a, b) => a.timestamp - b.timestamp);
  }, [chatMessages]);

  const renderMessage = ({ item }) => {
    const isMine = item.senderId === id;
    return (
      <View style={[styles.messageContainer, isMine ? styles.mine : styles.theirs]}>
        {!isMine && (
          <Text style={styles.senderName}>{name}</Text>
        )}
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  const handleBack = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icons/chatbg.png")} style={styles.imageBg} />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require("../assets/icons/left-arrow.png")} resizeMode='contain' />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/icons/profile.png')} style={styles.profileImage} resizeMode='contain' />
        </View>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={sortedMessages}
          keyExtractor={(item) => item.messageId}
          renderItem={renderMessage}
          contentContainerStyle={styles.chatContainer}
        />
      </KeyboardAvoidingView>
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
      {isLoading && (
        
          <ActivityIndicator size="large" color="#8686DB" style={styles.loadingIndicator} />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  topBar: {
    width: '100%',
    height: 100,
    marginTop: 25,
    backgroundColor: '#1B0333',
    justifyContent: 'center',
    position: 'relative',
  },
  profileContainer: {
    backgroundColor: '#8686DB',
    borderColor: 'white',
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  nameText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 6,
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
  loadingOverlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
  },
  loadingBg: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    marginTop: 20,
    transform: [{ scale: 2 }],
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
