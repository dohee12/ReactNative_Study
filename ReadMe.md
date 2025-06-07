## Expo Project with TypeScript 생성하기

npx create-expo-app "my project name" --template

## Expo 아이콘 설치 방법

npm install @expo/vector-icons --force
https://icons.expo.com

## NodeJS 설치

## 프로젝트 생성방법 with TypeScript

## Firebase 연동하기

1. Google 에서 Firebase에서 만들기
2. Firebase에서 'Web App'추가하기를 통해 앱 추가하여 프로젝트와 연결
3. RN Project Firebase SDK 추가하기
   npm install firebase --force
4. Firebase API key는 firebaseConfig.ts 만들어서 복붙
   // Your web app's Firebase configuration
   const firebaseConfig = {
   apiKey: "AIzaSyBoRvcYwGS1z2E3f10eSeyLoL15TCNhp1o",
   authDomain: "daelininsta.firebaseapp.com",
   projectId: "daelininsta",
   storageBucket: "daelininsta.firebasestorage.app",
   messagingSenderId: "929517181869",
   appId: "1:929517181869:web:cd9749a38d2dd5dc7b9f24",
   };
5. auth 인증 만들 때, reactnative 호환을 위해 아래 package 설치
   npm i @react-native-async-storage/async-storage --force
   tsconfig.json에 아래 문구 추가하여, typescript가 해당 기능 사용할 수 있도록 정확히 연결
   {
   "extends": "expo/tsconfig.base",
   "compilerOptions": {
   "strict": true,
   "paths": {
   "@firebase/auth": ["./node_modules/@firebase/auth/dist/index.rn.d.tsx"]
   }
   }
   }

# Expo app build

1. npm install -g eas-cli // 빌드 환경 셋업 설치
2. eas login // expo 로그인
3. eas build:configure // 빌드를 하기 위한 파일 생성
4. eas build -p android --profile preview // 안드로이드 빌드
5. eas build -p ios --profile preview // iOS 빌드
