import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MainStackList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../firebaseConfig";

// 1. onClick (버튼)
// 1-a. function 키워드
// input = params = 매개변수 (optional)
// output = return = 반환값 (required)
function fun() {}
// 1-b. arrow function
// let : 재선언 가능
// const : 재선언 불가능

// Home 컴포넌트 정의의
export default () => {
  // Hook : 페이지 이동을 위한 navigation Hook
  const navi = useNavigation<NativeStackNavigationProp<MainStackList>>();

  // Header Button을 눌렀을 때 페이지 이동
  const goToScreen = () => {
    // 특정 Stack의 Screen으로 이동
    navi.navigate("CreatePost");
  };

  // UI Page Rendering
  return (
    <SafeAreaView style={styles.container}>
      {/* 화면 상단 여백을 추가 */}
      <View style={{ paddingTop: 20 }}>
        {/* 헤더 영역 */}
        <View style={styles.header}>
          {/* 앱 이름 */}
          <Text>InstaDaelim</Text>
          {/* "create" 버튼 : 클릭 시 goToScreen 함수 호출 */}
          <Button onPress={goToScreen} title="create" />
        </View>
        {/* 본문 텍스트 */}
        <Text>hello word</Text>
      </View>
      {/* 로그아웃 버튼 */}
      <Button
        title="Log Out"
        onPress={async () => {
          await auth.signOut();
        }}
      />
    </SafeAreaView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지
    backgroundColor: "#fff", // 배경색을 흰색으로 설정
  },
  header: {
    height: 50, // 헤더 높이
    backgroundColor: "lightgray", // 헤더 배경색
    flexDirection: "row", // 가로 방향으로 정렬
    justifyContent: "space-between", // 요소 간의 간격을 통일하게 설정
    alignItems: "center", // 세로 방향으로 가운데 설정
    paddingHorizontal: 10, // 좌우 여백 추가
  },
});
