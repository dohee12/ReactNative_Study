import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={"dodgerblue"} />
    </View>
  );
};

export default LoadingScreen;
