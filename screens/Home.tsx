import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MainStackList } from "../stacks/MainStack";
import { auth } from "../firebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Timeline from "../components/Timeline";

// Logic Process
// >arrow function
// >> let : 재선언 가능
// >> const : 재선언 불가능
export default () => {
  // Hook : SafeArea
  const { top } = useSafeAreaInsets();
  // Hook : 페이지 이동을 위한 navigation Hook
  const navi = useNavigation<NativeStackNavigationProp<MainStackList>>();
  // Header Button을 눌렀을 때 페이지 이동
  const goToScreen = () => {
    // 특정 Stack 의 Screen으로 이동
    navi.navigate("CreatePost");
  };

  // UI Page Rendering
  return (
    <SafeAreaView style={[styles.container, { paddingTop: top }]}>
      <View style={styles.header}>
        <Text>InstaDaelim</Text>
        <Button onPress={goToScreen} title="create" />
      </View>
      <ScrollView>
        <Timeline />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
