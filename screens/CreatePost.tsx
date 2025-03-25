import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";

// styled-component를 통해 css 컴포넌트를 생성 / 관리
const Container = styled(View)`
  background-color: #ffd429;
  flex: 1;
`;
// state : RN에서 화면에 보여지게할 변수데이터
export default () => {
  // State 0 : 로딩 여부....
  const [loading, setLoading] = useState(false);
  // State 1 : 갤러리에 불러올 사진 'Data'들
  const [assets, setAssets] = useState(0);
  // State 2 : 내가 선택한 사진'들'
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // 내 갤러리에서 사진을 가져오는 함수
  // a. 페이지가 생성될 때 1번
  // b. 스크롤 최하단까지 내려서 다음 사진목록 가져올 때 1번
  const getMyPhotos = () => {
    Alert.alert("hello world");
  };

  // Hook : 컴포넌트 생성 시 '1번만' 실행되는 lifecycle 함수
  useEffect(() => {
    getMyPhotos();
  }, []);

  // Page UI Rendering
  // a. 로딩 중일 때 : loadingScreen
  // b. 로딩이 끝나면 : 현재화면 (createPost)
  return loading ? <LoadingScreen /> : <Container></Container>;
};
