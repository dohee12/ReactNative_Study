import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}> 
      <Text>hello word</Text> {/* 택스트 */}
      <StatusBar style="auto" /> {/* 상단 상태바 */}
    </View> // <View>, </View>, <Text>, <StatusBar> = Component
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 영역에서 차지하는 비율 (1 = 100)
    backgroundColor: '#fff', // 백그라운드 배경
    alignItems: 'center', // 왼쪽, 오른쪽, 중간
    justifyContent: 'center', // 위, 중간, 아래
  },
});
