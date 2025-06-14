import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';



const Card = ({ name,onpress, profilePicture, date }) => {
  

 

  return (
    <TouchableOpacity onPress={onpress}>

      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={profilePicture?{uri:profilePicture}:require('../assets/icons/profile.png')}
            style={styles.images}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}></Text>
          
        </View>

        
      </View>
    </TouchableOpacity> 
  );
};



export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginBottom: 10,
    width: 390,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

  },
  cardExpanded: {
    backgroundColor: '#fdf6f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date:{
 position:'absolute',
 color:'grey',
 top:40,
 left:60,


  },
  images: {
    width: 40,
    height: 40,
    resizeMode: 'contentFit',
    borderRadius: 25,
   backgroundColor:'#8686DB',
    marginRight: 12,
  },
  infoContainer: {
    marginTop: 10,
    paddingLeft: 62, // aligns with name start
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1B0333',
  },
  licenseNumber: {
    marginBottom: 5,
    color: '#1B0333',
  },
  vehicleType: {
    marginBottom: 5,
  },
  rating: {
    marginBottom: 5,
  },
  phone: {
    marginBottom: 5,
  },
  bookmarkContainer:{
    position:'absolute',
   marginLeft:300,
   
  },
  bookmark:{
    width:30,
    height:40.
    
  }
});
