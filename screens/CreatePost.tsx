import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import * as MediaLibrary from "expo-media-library";

// styled-component를 통해 css 컴포넌트를 생성 / 관리
const Container = styled(View)`
  background-color: #ffd429;
  flex: 1;
`;
const ScrollBox = styled(ScrollView)``;

// Photo from Gallery
const Photo = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
`;
const PhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
  background-color: red;
`;

// state : RN에서 화면에 보여지게할 변수데이터
export default () => {
  // State 0 : 로딩 여부....
  const [loading, setLoading] = useState(true);
  // State 1 : 갤러리에 불러올 사진 'Data'들
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  // State 2 : 내가 선택한 사진'들'
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // 내 갤러리에서 사진을 가져오는 함수
  // a. 페이지가 생성될 때 1번
  // b. 스크롤 최하단까지 내려서 다음 사진목록 가져올 때 1번
  const getMyPhotos = async () => {
    // A)) 접근 권한 요청이 거절되거나, 수락한 적이 없는 경우우
    // 1. 갤러리 접근 권한 요청
    const { status } = await MediaLibrary.requestPermissionsAsync();
    // 2. (방어코드) 권한 요청 거절 시, 재 요청
    if (status === MediaLibrary.PermissionStatus.DENIED) {
      // 재요청
      Alert.alert(
        "사진 접근 권한 거절",
        "사용하려면 다시 권한을 수정해주세요",
        // 확인버튼을 누르면, 앱설정창으로 이동
        [{ onPress: async () => await Linking.openSettings() }]
      );
      // getMyPhotos 함수 종료
      return;
    }

    // B)) 접근 권한 요청 허용한 경우
    // 3. 갤러리에서 사진'들'을 불러오기 (비동기적)
    const { assets } = await MediaLibrary.getAssetsAsync();
    console.log(assets);
    // 4. 불러온 사진'들'을 변수(State)에 할당
    setAssets([1, 2, 3, 4, 5]);
    // Final...
    setLoading(false);
  };

  // Hook : 컴포넌트 생성 시 '1번만' 실행되는 lifecycle 함수
  useEffect(() => {
    getMyPhotos();
  }, []);

  // Page UI Rendering
  // a. 로딩 중일 때 : loadingScreen
  // b. 로딩이 끝나면 : 현재화면 (createPost)
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <ScrollBox>
        {/* 내가 불러온 갤러리 사진 개수만큼 표시*/}
        {assets.map((item) => (
          <Photo>
            <PhotoImg />
          </Photo>
        ))}
      </ScrollBox>
    </Container>
  );
};
