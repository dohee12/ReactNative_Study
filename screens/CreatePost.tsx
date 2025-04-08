import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import * as MediaLibrary from "expo-media-library";

// styled-component를 통해 css 컴포넌트를 생성 / 관리
const Container = styled(View)`
  flex: 1;
`;
const SelectedPhotoScroll = styled(ScrollView)``;
const SelectedPhoto = styled(Image)``;

// Photo from Gallery
const Photo = styled(TouchableOpacity)`
  width: 100px;
  height: 100px;
`;
const PhotoImg = styled(Image)`
  width: 100%;
  height: 100%;
`;

// 한 줄에 띄우고 싶은 갤러리 사진 개수
const numColumn = 3;

// state : RN에서 화면에 보여지게할 변수데이터
export default () => {
  // State 0 : 로딩 여부....
  const [loading, setLoading] = useState(true);
  // State 1 : 갤러리에 불러올 사진 'Data'들
  //const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [assets, setAssets] = useState<DummyPhotoType[]>([]);
  // State 2 : 내가 선택한 사진'들'
  const [selectedPhotos, setSelectedPhotos] = useState<DummyPhotoType[]>([]);
  // Hook : 내 디바이스의 가로/세로 크기를 가져온다
  const { width: WIDTH } = useWindowDimensions();

  // FlatList에 띄어줄 Item(Photo)의 크기
  const itemSize = WIDTH / numColumn;
  // SelectedPhotoScrollView에 띄어줄 Item(SelectedPhoto)의 크기
  const photoSize = WIDTH * 0.75;

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
    setAssets(dummyPhotos);
    // Final...
    setLoading(false);
  };

  // 불러온 사진들 중에서 업로드하고 싶은 사진 선택 (id 값으로 구분)
  const onSelectPhoto = (photo: DummyPhotoType) => {
    // 1. 선택하지 않은 사진 누른 경우 -> 추가
    // 1-1. selectedPhotos 리스트에 선택한 사진 추가
    setSelectedPhotos([...selectedPhotos, photo]);
    // 1-2. 기존의 선택한 사진들 리스트 가져오기
    // const photolist = selectedPhotos;
    // 1.3. 리스트(1-1)에서 선택한 사진 추가
    // photolist.push(photo);
    // 1-4. 새롭게 사진이 추가된 리스트로 selectedPhotos를 갱신
    // setSelectedPhotos(photolist);
    // 2. 선택한 사진을 누른 경우 -> 해제
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
      {/* A.ScrollView를 횔용한 내가 선택한 사진을 보여주는 영역 */}
      <SelectedPhotoScroll
        horizontal={true} // 가로 스크롤
        showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        style={{ width: WIDTH, height: WIDTH }}
        contentContainerStyle={{ gap: 5 }}
      >
        {
          // 내가 선택한 사진들이 있다면, 하나씩 SelectedPhoto 컴포넌트를 통해 Rendering
          selectedPhotos.map((photo) => (
            <SelectedPhoto
              key={photo.id}
              source={{ uri: photo.uri }}
              style={{ width: photoSize, height: photoSize }}
            />
          ))
        }
      </SelectedPhotoScroll>
      {/* B.FlatList를 활용한 갤러리에서 불러올 사진들을 보여주는 영역 */}
      <FlatList
        numColumns={numColumn}
        data={assets} /** 실제 Data */
        renderItem={({ item }) => (
          <Photo
            onPress={() => onSelectPhoto(item)}
            style={{ width: itemSize, height: itemSize }}
          >
            <PhotoImg source={{ uri: item.uri }} />
          </Photo>
        )} /** Data를 어떻게 보여줄지 (UI) */
      />
    </Container>
  );
};

// 가짜(Dummy) 사진 타입
// 1. type
type DummyPhotoType = {
  id: string;
  uri: string;
};
// 1-a type : Union(변수에 들어갈 데이터를 제한)
type AlignItemsType = "Daelim" | "software";
const daelim: AlignItemsType = "Daelim";
// 2. interface
interface IDummyPhotoType {
  id: string;
  uri: string;
}

// 가짜(Dummy) 사진 데이터  리스트
const dummyPhotos: IDummyPhotoType[] = [
  { id: "1", uri: "https://picsum.photos/id/1/200/300" },
  { id: "2", uri: "https://picsum.photos/id/2/200/300" },
  { id: "3", uri: "https://picsum.photos/id/3/200/300" },
  { id: "4", uri: "https://picsum.photos/id/4/200/300" },
  { id: "5", uri: "https://picsum.photos/id/5/200/300" },
  { id: "6", uri: "https://picsum.photos/id/6/200/300" },
  { id: "7", uri: "https://picsum.photos/id/7/200/300" },
  { id: "8", uri: "https://picsum.photos/id/8/200/300" },
  { id: "9", uri: "https://picsum.photos/id/9/200/300" },
  { id: "10", uri: "https://picsum.photos/id/10/200/300" },
];
