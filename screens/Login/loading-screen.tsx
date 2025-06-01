import { ActivityIndicator, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size={"large"} color={"dodgerblue"} />
    </View>
  );
};

export default LoadingScreen;
