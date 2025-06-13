import { View, Text, TouchableOpacity, StyleSheet,ActivityIndicator,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FriendRequest from '../components/friendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendsSreen = () => {
    const [showFriends, setShowFriens] = useState(true);
    const [isRequests,setRequests]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const handleButton =()=>{
setShowFriens(false);
  getRequests();
 }

 useEffect(()=>{
    getRequests();
 },[])
 //hundling request
 const getRequests = async()=>{
    
  try {
    setIsLoading(true);
    
    const userString = await AsyncStorage.getItem('user');
    const user =await JSON.parse(userString);
    const token = user.token;
      // console.log("Token \n =>",token)
    const response = await fetch(`http://192.168.253.200:8080/api/friends/requests/pending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

   
    if (response.ok) {
        const data = await response.json();
        setRequests(data);
        //console.log("\n\nreturned data =>",data);
     
    } else {
      console.log("Server responded with error:", response);
    }

  } catch (error) {
    console.error("fetch request failed:", error);
  } finally {
    setIsLoading(false);
  }
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
                  {isRequests.map((user)=>(
                <View key={user.document_Id}>
                 <FriendRequest
                  name={user.fullName}
                   isRequest={true}
                
                />
                  </View>
                  ))

                  }
                    {isLoading && 
                    <View style={{width:'100%',
                    height:'100%',
                    position:'absolute',
                    backgroundColor:'white',
                    
                    }}>
                    <Image 
                    source={require('../assets/icons/loading-bg.png')}
                    style={{width:'100%',height:'100%'}}
                    />
                    <ActivityIndicator 
                    size="large"
                     color="#8686DB"
                    style={{ marginTop: 20 ,
                    transform: [{ scale: 2 }],
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    }} />
                    
                    </View>}

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