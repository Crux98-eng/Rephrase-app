import { Link } from 'expo-router';
import { View, Text,Image,StyleSheet } from 'react-native';
import CustomButton from './components/CustomButton';
import icons from './assets/icons'
export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: 'center',width:'100%',height:'100%' }}>
  <Image
  source={require('./assets/images/onboardImage.png')}
  style={styles.imgs}
  
  />
      <Text style={{top:2}}></Text>
      {/* <Link href='/chat'>got to</Link> */}
           <View style={styles.btn}>
      <CustomButton onPress={()=>{}} title='Get started' />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

imgs:{
  width:200,
  height:200,
  top:150,
  resizeMode:'contain'
},
btn:{
  top:250

}


});