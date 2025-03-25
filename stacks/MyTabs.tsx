import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyInfo from "../screens/MyInfo";
import Home from "../screens/Home";

// Tab용 navigation 컴포넌트 생성
const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyInfo" component={MyInfo} />
    </Tab.Navigator>
  );
};
