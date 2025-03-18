import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";

export default () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
