// import { Link } from 'expo-router';
// import { View, Text,Image,StyleSheet, SafeAreaView } from 'react-native';
// import { useNavigation } from 'expo-router';
// import { router } from 'expo-router';
// import CustomButton from './components/CustomButton';

// export default function Page() {
 
//   return (
//   <SafeAreaView>
//     <View style={{ flex: 1, alignItems: 'center',width:'100%',height:'100%' }}>
//   <Image
//   source={require('./assets/images/onboardImage.png')}
//   style={styles.imgs}
  
//   />
//       <Text style={{top:2}}></Text>
//       {/* <Link href='/chat'>got to</Link> */}
//            <View style={styles.btn}>
//       <CustomButton onPress={()=>{router.push('/signin')}} title='Get started' />
//       </View>
//     </View>
//    </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({

// imgs:{
//   width:200,
//   height:200,
//   top:150,
//   resizeMode:'contain'
// },
// btn:{
//   top:250

// }


// });


import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './components/CustomButton';

export default function Page() {
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          router.replace('/home'); // Redirect to home if token exists
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setCheckingToken(false); // Stop loading spinner
      }
    };

    checkToken();
  }, []);

  if (checkingToken) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{ flex: 1, alignItems: 'center', width: '100%', height: '100%' }}>
        <Image source={require('./assets/images/onboardImage.png')} style={styles.imgs} />
        <Text style={{ top: 2 }}></Text>

        <View style={styles.btn}>
          <CustomButton onPress={() => { router.push('/signin'); }} title='Get started' />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgs: {
    width: 200,
    height: 200,
    top: 150,
    resizeMode: 'contain',
  },
  btn: {
    top: 250,
  },
});
