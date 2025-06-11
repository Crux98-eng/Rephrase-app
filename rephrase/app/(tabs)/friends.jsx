import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendRequest from '../components/friendRequest';

const FriendsSreen = () => {
    const [showFriends, setShowFriens] = useState(true);
  
 const handleButton =()=>{
setShowFriens(false);
 }
    return (
        <View>
            <View style={styles.buttonContainer}>
                {/* buttons to decide what to display */}
                <TouchableOpacity onPress={()=>setShowFriens(true)} style={ styles.btn1 }>
                    <Text>find friends</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleButton} style={styles.btn2}>
                    <Text>Your Friends</Text></TouchableOpacity>
            </View>
            {/* conditonal rendering based on the button */}
            {showFriends &&
               (
                <View style={styles.findFriend}>
                <FriendRequest
                name="Eric"
                isRequest={true}
                
                />
                <FriendRequest
                name="Sylus"
                isRequest={false}
                
                />
                </View>
               )
            }

        </View>
    )
}

export default FriendsSreen

const styles = StyleSheet.create({
btn1:{
    fontSize:'24pt',
     backgroundColor:'#E6E6E6',
     paddingHorizontal:20,
     paddingVertical:8,
     color:'#000066'
},
btn2:{
      fontSize:'24pt',
     backgroundColor:'#E6E6E6',
     paddingHorizontal:20,
     paddingVertical:8,
    color:'#000066'

},
buttonContainer:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    height:100,
  justifyContent:'center',
  alignItems:'center',
  gap:1
},
findFriend:{
    width:'100%',
    height:'100%',
    backgroundColor:'#E6E6E6',
    gap:3,
},

})