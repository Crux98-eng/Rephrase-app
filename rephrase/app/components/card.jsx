import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { custom_colors } from '../utilities/colors';



const Card = ({ name,onpress, profilePicture, date ,color}) => {
  

 

  return (
    <TouchableOpacity onPress={onpress}>

      <View style={styles.card}>
        <View style={[styles.header,{backgroundColor:color}]}>
          <Image
            source={profilePicture?{uri:profilePicture}:require('../assets/icons/profile.png')}
            style={styles.images}
          />
         
          
        </View>
  <View style={styles.textContainer}>
     <Text style={[styles.name,{}]}>{name}</Text>
  </View>
        
      </View>
    </TouchableOpacity> 
  );
};



export default Card;

const styles = StyleSheet.create({
  card: {
   
    borderRadius: 10,
    marginBottom: 10,
    width: 390,
    padding: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    display:'flex',
    flexDirection:'row',

  },
  textContainer:{
  width:300,
  height:50,
  borderRadius:8,
  backgroundColor:'white',
  display:'flex',
  justifyContent:'center',
  alignItems:'flex-start',
  paddingLeft:20,
  marginLeft:10,
  
    
  },
  cardExpanded: {
    backgroundColor: '#fdf6f0',
  },
  header: {
    width:50,
    height:50,
    borderRadius:'50%',
    display:'flex',
    alignItems:'center',
    overflow:'hidden',
    paddingTop:10,
  },
 
  images: {
    width: 40,
    height: 40,
    marginBottom:0,
    
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
