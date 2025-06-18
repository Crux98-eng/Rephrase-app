
import React, { useState, useMemo, useCallback } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chat screen with improved state, edge case handling, and timestamps
const ChatScreen = () => {
  const { userId, name } = useLocalSearchParams();
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const url = 'https://rephrase-chatapi.onrender.com';

  // Load current user info on screen focus
  useFocusEffect(useCallback(() => {
    const init = async () => {
      const userDataString = await AsyncStorage.getItem('user');
      const user = userDataString ? JSON.parse(userDataString) : null;
      if (user) {
        setId(user.uid);
        await fetchMessages(user.token);
      }
    };
    init();
  }, [userId]));

  // Fetch messages for this conversation
  const fetchMessages = async (token) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}/api/chat/messages/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setChatMessages(data);
      } else {
        console.warn("Failed to fetch messages");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send a new message and update state
  const handleSend = async () => {
    if (!inputText.trim()) return;
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    const token = user.token;

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

    try {
      setChatMessages((prev) => [...prev, newMessage]); // Optimistically add message
      setInputText('');

      const response = await fetch(`${url}/api/chat/messages/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: userId,
          senderId: id,
          text: newMessage.message,
        })
      });

      if (!response.ok) {
        console.warn("Message failed to send");
      }
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  // Sort messages by timestamp
  const sortedMessages = useMemo(() => {
    return [...chatMessages].sort((a, b) => a.timestamp - b.timestamp);
  }, [chatMessages]);

  // Format date/time display
  const formatTime = (ts) => {
    const date = new Date(ts);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (ts) => {
    const date = new Date(ts);
    return date.toDateString();
  };

  // Render individual message bubble
  const renderMessage = ({ item, index }) => {
    const isMine = item.senderId === id;
    const showDate =
      index === 0 || formatDate(item.timestamp) !== formatDate(sortedMessages[index - 1]?.timestamp);

    return (
      <>
        {showDate && (
          <Text style={styles.dateLabel}>{formatDate(item.timestamp)}</Text>
        )}
        <View style={[styles.messageContainer, isMine ? styles.mine : styles.theirs]}>
          {!isMine && <Text style={styles.senderName}>{name}</Text>}
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.timeStamp}>{formatTime(item.timestamp)}</Text>
        </View>
      </>
    );
  };

  const handleBack = () => router.push('/home');

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icons/chatbg.png")} style={styles.imageBg} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require("../assets/icons/left-arrow.png")} resizeMode='contain' />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/icons/profile.png')} style={styles.profileImage} resizeMode='contain' />
        </View>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      {/* Chat messages */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#8686DB" style={styles.loadingIndicator} />
        ) : (
          <FlatList
            data={sortedMessages}
            keyExtractor={(item) => item.messageId}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
          />
        )}
      </KeyboardAvoidingView>

      {/* Input box */}
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
    backgroundColor: '#fff',
  },
  imageBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topBar: {
    width: '100%',
    height: 100,
    backgroundColor: '#000066',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    tintColor: 'white',
    top: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    zIndex: 10,
  },
  profileContainer: {
    backgroundColor: '#8686DB',
    borderColor: 'white',
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  nameText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 6,
    fontWeight: '600',
    fontSize: 16,
  },
  chatContainer: {
    paddingHorizontal: 12,
    paddingBottom: 80,
    paddingTop: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    position: 'relative',
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
  timeStamp: {
    fontSize: 10,
    color: '#ccc',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  dateLabel: {
    alignSelf: 'center',
    backgroundColor: '#EAEAEA',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
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
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
    zIndex: 1000,
  },
});
