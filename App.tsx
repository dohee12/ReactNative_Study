import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";
import AuthStack from "./stacks/AuthStack";

export default () => {
  return (
    <NavigationContainer>
      {/* <MainStack /> */}
      <AuthStack />
    </NavigationContainer>
  );
};
