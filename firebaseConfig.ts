// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoRvcYwGS1z2E3f10eSeyLoL15TCNhp1o",
  authDomain: "daelininsta.firebaseapp.com",
  projectId: "daelininsta",
  storageBucket: "daelininsta.firebasestorage.app",
  messagingSenderId: "929517181869",
  appId: "1:929517181869:web:cd9749a38d2dd5dc7b9f24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth 로그인 인증, 유저 정보 + ReactNative 호환
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase DB에 저장 정보
export const db = getFirestore(app);

// Initialize Storage에 대한 정보
export const storage = getStorage(app);
