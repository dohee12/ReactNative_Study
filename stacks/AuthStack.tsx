import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import CreateAccountScreen from "../screens/Login/create-account-screen";
import LoginScreen from "../screens/Login/login-screen";

// [Before Login] 로그인 관련 페이지 등록
const Stack = createNativeStackNavigator<AuthStackList>();

// key(screenName) : value(params)
export type AuthStackList = {
  Login: undefined;
  CreateAccount: undefined;
};

// navigation type 용
export type AuthNaviProps = NativeStackNavigationProp<AuthStackList>;

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
