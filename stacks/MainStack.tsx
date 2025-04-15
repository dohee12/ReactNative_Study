import { createStackNavigator } from "@react-navigation/stack";
import CreatePost from "../screens/CreatePost";
import UploadPost from "../screens/UploadPost";
import MyTabs from "./MyTabs";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      {/* 가장 위에 있는 screen을 첫화면으로 보여준다 */}
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      {/* 보이지 않지만 등록되어, 언제든 이동할 수 있는 스크린 */}
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="UploadPost" component={UploadPost} />
    </Stack.Navigator>
  );
};
