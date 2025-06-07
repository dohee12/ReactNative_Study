import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./stacks/MainStack";
import AuthStack from "./stacks/AuthStack";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { User } from "firebase/auth";
import LoadingScreen from "./screens/LoadingScreen";

export default () => {
  // 1. 로그인 여부
  const [user, setUser] = useState<User | null>(null);
  // 2. Loading(로그인 여부를 확인하는 시간)
  const [loading, setLoading] = useState(true);

  // 로그인 여부를 확인한다 (with Server .. 비동기(=async) 처리)
  const getAuth = async () => {
    // 1.로그인 여부 확인(서버에서 확인할 때까지 기다림)
    await auth.authStateReady();
    // 2.로그인 여부 확인이 끝나면 로딩 종료
    setLoading(false);
    // 3.로그인 여부에 따라 'user' State에 값을 할당
    auth.onAuthStateChanged((authState) => {
      // 3-a. 로그인 O => user 로그인 정보 할당
      if (authState) {
        setUser(authState);
      }
      // 3-b. 로그인 X => user 로그인 정보 미할당
      else {
        setUser(null);
      }
    });
  };

  // App.tsx, 즉 App이 실행되자마자 1번 호출되는 Hook
  useEffect(() => {
    // 앱이 실행되면, 로그인 여부를 확인
    getAuth();
  }, []);

  // 로그인 O => MainStack
  // 로그인 X => AuthStack
  // 로그인여부(조건) ? MainStack : AuthStack ;
  const StateStack = user ? <MainStack /> : <AuthStack />;

  return (
    <NavigationContainer>
      {
        // 로그인 여부를 확인하는 동안 로딩화면 띄워줌
        loading ? <LoadingScreen /> : StateStack
      }
    </NavigationContainer>
  );
};
