import { createStackNavigator } from "@react-navigation/stack";
import CreatePost from "../screens/CreatePost";
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
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};
