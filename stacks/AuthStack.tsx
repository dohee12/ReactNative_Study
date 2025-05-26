import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/login-screen";

// [Before Login] 로그인 관련 페이지 등록
const Stack = createNativeStackNavigator<AuthStackList>();

// key(screenName) : value(params)
type AuthStackList = {
  Login: undefined;
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
