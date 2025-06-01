import { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styled, { css } from "styled-components";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { AuthNaviProps } from "../../stacks/AuthStack";

const ImgContainer = styled(ImageBackground)`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled(Text)``;

const LoginBox = styled(View)`
  background-color: white;
  width: 70%;
  padding: 30px;
  gap: 25px;
  border-radius: 5px;
`;
const Logo = styled(Image)`
  width: 100%;
  height: 100px;
`;
const InputField = styled(View)`
  gap: 10px;
`;
const InputCSS = css`
  border-radius: 5px;
  background-color: #e9e9e9;
  font-size: 16px;
  padding: 10px 15px;
`;
const UserEmail = styled(TextInput)`
  ${InputCSS};
`;
const UserPassword = styled(TextInput)`
  ${InputCSS};
`;
const LoginBtn = styled(TouchableOpacity)`
  background-color: dodgerblue;
  align-items: center;
  justify-content: center;
  padding: 5px 13px;
  border-radius: 5px;
`;
const LoginBtnTitle = styled(Text)`
  color: white;
  font-size: 15px;
  font-weight: 400;
`;
const CreateAccount = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;
const CreateAccountTitle = styled(Text)`
  font-size: 13px;
  color: #3d3d3d;
`;
const CreateAccountText = styled(Text)`
  font-size: 14px;
  color: dodgerblue;
  font-weight: 600;
  text-decoration: underline;
`;
const ErrorBox = styled(View)`
  justify-content: center;
  align-items: center;
`;
const ErrorMessage = styled(Text)`
  color: red;
`;

const logoSource = require("../../assets/resources/instaDaelim_title.png");
const bgSource = require("../../assets/resources/instaDaelim_background.jpg");
const LoginScreen = () => {
  // State Input (Email, PassWord)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navi = useNavigation<AuthNaviProps>();

  // email, password 입력 시, state 할당/저장
  const onChangeText = (text: string, type: "email" | "password") => {
    switch (type) {
      case "email":
        setEmail(text);
        break;
      case "password":
        setPassword(text);
        break;
    }
  };

  // 회원가입 버튼을 누르면, 회원가입 페이지로 이동
  const goToCreateAccount = () => {
    navi.navigate("CreateAccount");
  };

  // 서버에 Email, Password 전달하여 로그인 인증 진행
  const onUpload = async () => {
    // [방어코드] : email, password 입력 안한 경우에 경고

    // 1. 로딩 시작... & Error 메시지 초기화
    setLoading(true);
    setError(null);

    try {
      // 2. 서버에 Email, Password 전달
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 3-1. 로그인 성공 => Home으로 이동

      Alert.alert("Login Success");
    } catch (error) {
      // 3-2. 로그인 실패 => 실패문구 표시
      // firebase 관련된 로그인 에러만 표시
      if (error instanceof FirebaseError) {
        console.error("Error", error.code);
        // 직접 작성한 Firebase 에러코드 타입의 값으로 'key'타입으로 형변환
        const errorCode = error.code as keyof FirebaseErrorCodeType;
        // 형변환된 에러코드를 Error state에 할당한다다
        setError(FirebaseErrorCode[errorCode]);
      }
    } finally {
      // 로딩 종료
      setLoading(false);
    }
  };

  return (
    // 키패드가 화면(입력하는 영역)을 가리지 않도록 화면을 올려서 피한다
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* 키패드가 나타난 경우, 입력창 이외에 화면을 터치했을 때 키패드를 다시 가린다 */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImgContainer source={bgSource} resizeMode="cover">
          <LoginBox>
            {/* 앱 로고 */}
            <Logo source={logoSource} />
            <Title>Welcome! 🤗{"\n"}This is instagram for daelim</Title>
            {/* 유저 Email & PW 입력공간 */}
            <InputField>
              <UserEmail
                value={email}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(text) => {
                  onChangeText(text, "email");
                }}
                placeholder="Email *"
              />
              <UserPassword
                secureTextEntry={true}
                value={password}
                returnKeyType="done"
                onChangeText={(text) => {
                  onChangeText(text, "password");
                }}
                placeholder="Password *"
              />
            </InputField>
            {/* 로그인 버튼  */}
            <LoginBtn onPress={loading ? undefined : onUpload}>
              <LoginBtnTitle>{loading ? "Loading..." : "Log in"}</LoginBtnTitle>
            </LoginBtn>
            {/* 에러 메시지 출력 */}
            {!error && (
              <ErrorBox>
                <ErrorMessage>{error}</ErrorMessage>
              </ErrorBox>
            )}
            {/* 회원가입 버튼  */}
            <CreateAccount onPress={goToCreateAccount}>
              <CreateAccountTitle>Already have an account?</CreateAccountTitle>
              <CreateAccountText>Create Account</CreateAccountText>
            </CreateAccount>
          </LoginBox>
        </ImgContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// Type
type FirebaseErrorCodeType = {
  "auth/invalid-email": string;
  "auth/invalid-credential": string;
  "auth/missing-password": string;
};

// Firebase Error Code...
const FirebaseErrorCode: FirebaseErrorCodeType = {
  "auth/invalid-email": "invalid email form",
  "auth/invalid-credential": "잘못된 계정 정보",
  "auth/missing-password": "비밀번호를 입력하지 않음음",
};
