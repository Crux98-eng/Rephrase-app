import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'

const MyFriends = ({name,profilePic,pressed,Color}) => {
  return (
    <View style={styles.continer}>
        <TouchableOpacity onPress={pressed} style={[styles.touchables,{backgroundColor:Color}]}>
            
            <Image
            source={profilePic? {uri:profilePic}:require('../assets/icons/profile.png')}
            style={profilePic?{ width:90, height:90}:{width:50,height:50,marginTop:20,tintColor:'#ffff'}}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={pressed} style={styles.names}>
            <Text style={{fontSize:18,}}>{name ? name : "User"}</Text>
        </TouchableOpacity>
       <Text style={{
         position:'absolute',
            left:120,
            marginTop:20,
      color:'grey',
            
            }}>friends</Text>
    </View>
  )
}

export default MyFriends

const styles = StyleSheet.create({
continer:{
    width:'100%',
    height:100,
    
    justifyContent:'center',
   
},
touchables:{
    width:60,
    height:60,
    borderRadius:'50%',
    
   overflow:'hidden',
    alignItems:'center',
    marginLeft:40,

    

},
names:{
    position:'absolute',
    left:120,
    top:20,
   
},


})