import { createStackNavigator } from "@react-navigation/stack";
import CreatePost, { DummyPhotoType } from "../screens/CreatePost";
import UploadPost from "../screens/UploadPost";
import MyTabs from "./MyTabs";

// Stack에 등록되어있는 Screen 리스트
export type MainStackList = {
  // 등록된 스크린 이름 : 스크린에 전달할 데이터 형태
  MyTabs: undefined;
  CreatePost: undefined;
  UploadPost: {
    assets: DummyPhotoType[];
  };
};

// Stack Navigator를 생성성
const Stack = createStackNavigator<MainStackList>();

export default () => {
  return (
    <Stack.Navigator>
      {/* 가장 위에 있는 screen을 첫화면으로 보여준다 */}
      {/* 이 화면은 앱이 실행될 때 가장 먼저 보여짐 */}
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }} // 상단 헤더를 숨김
      />
      {/* 보이지 않지만 등록되어, 언제든 이동할 수 있는 스크린 */}
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="UploadPost" component={UploadPost} />
    </Stack.Navigator>
  );
};
