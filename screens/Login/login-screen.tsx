import { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import styled, { css } from "styled-components";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

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

const logoSource = require("../../assets/resources/instaDaelim_title.png");
const bgSource = require("../../assets/resources/instaDaelim_background.jpg");
const LoginScreen = () => {
  // State Input (Email, PassWord)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

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

  // 서버에 Email, Password 전달하여 로그인 인증 진행
  const onUpload = async () => {
    // [방어코드] : email, password 입력 안한 경우에 경고

    // 1. 로딩 시작...
    setLoading(true);

    try {
      // 2. 서버에 Email, Password 전달
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 3-1. 로그인 성공 => Home으로 이동
      Alert.alert("Success", credential.user.email);
    } catch (error) {
      // 3-2. 로그인 실패 => 실패문구 표시
      // firebase 관련된 로그인 에러만 표시
      if (error instanceof FirebaseError) {
        Alert.alert("Error", error.message);
      }
    } finally {
      // 로딩 종료
      setLoading(false);
    }
  };

  return (
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
        <CreateAccount>
          <CreateAccountTitle>Already have an account?</CreateAccountTitle>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </LoginBox>
    </ImgContainer>
  );
};
