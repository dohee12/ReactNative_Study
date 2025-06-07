import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import MyInfo from "../screens/MyInfo";

// Bottom Tab 용 navigation 컴포넌트 생성
const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="MyInfo" component={MyInfo} />
    </Tab.Navigator>
  );
};
