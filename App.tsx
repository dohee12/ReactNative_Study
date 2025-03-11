import { StatusBar } from 'expo-status-bar';
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  // Logic Process
  // 1. onClick (버튼)
  // 1-a. function 키워드
  function 이름() {

  }
  // 1-b. arrow function
  // let : 재선언 가능
  // const : 재선언 불가능능
  const onClick = () => {
    // 알림창
    Alert.alert("버튼 클릭됨")
  }

  // UI Page Rendering
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop: 20}}> 
        <View style={styles.header}>
          <Text>InstaDaelim</Text>
          <Button onPress={onClick} title='create'/>
        </View>
        <Text>hello word</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height : 50,
    backgroundColor: 'lightgray',
    flexDirection : 'row', // 축의 방향을 변경
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingHorizontal : 10
  } 
});
