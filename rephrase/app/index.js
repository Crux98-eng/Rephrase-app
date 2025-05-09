import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello from Expo Router 👋</Text>
      <Link href='/chat'>got to</Link>
    </View>
  );
}
