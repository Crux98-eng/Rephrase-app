import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;

const FriendRequest = ({
  name,
  Color,
  isRequest,
  profile,
  confirmRequest,
  cancelRequest,
  addRequest,
  removeRequest
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.profileSection}>
        <View style={[styles.avatarWrapper, { backgroundColor: Color }]}>
          <Image
            source={profile ? { uri: profile } : require('../assets/icons/profile.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {isRequest ? (
          <>
            <TouchableOpacity onPress={confirmRequest} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelRequest} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={addRequest} style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeRequest} style={styles.button}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.92,
    backgroundColor: '#F0F0F3',
    alignSelf: 'center',
    borderRadius: 16,
    marginVertical: 12,
    padding: 16,
    flexDirection: 'column',
    shadowColor: '#fff',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#d1cdc7',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: '#F0F0F3',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#d1cdc7',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});
