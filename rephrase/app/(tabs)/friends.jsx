import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const FriendsSreen = () => {
    const [showFriends, setShowFriens] = useState(false);
    return (
        <View>
            <View style={styles.buttonContainer}>
                {/* buttons to decide what to display */}
                <TouchableOpacity style={ styles.btn1 }>
                    <Text>find friends</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btn2}>
                    <Text>Your Friends</Text></TouchableOpacity>
            </View>
            {/* conditonal rendering based on the button */}
            {showFriends &&{}}

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

})