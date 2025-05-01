import { useState, useEffect, useLayoutEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackList } from "../stacks/MainStack";

// styled-component를 통해 css 컴포넌트를 생성 / 관리
const Container = styled(View)`
  flex: 1; /* 화면 전체를 차지하도록 설정 */
`;
const SelectedPhotoScroll = styled(
  ScrollView
)``; /*선택된 사진을 가로로 스크롤할 수 있는 영역*/
const SelectedPhoto = styled(Image)``; /*선택된 사진을 표시하는 컴포넌트*/

// 갤러리에서 불러온 사진을 표시하는 컴포넌트
const Photo = styled(TouchableOpacity)`
  width: 100px; /*사진의 너비*/
  height: 100px; /*사진의 너비*/
`;
const PhotoImg = styled(Image)`
  width: 100%; /*사진의 너비를 부모 요소에 맞춤*/
  height: 100%; /*사진의 높이를 부모 요소에 맞춤*/
`;
const PhotoSelectCircle = styled(View)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: yellow;
  position: absolute;
  margin: 5px;
`; /*사진 선택 버튼*/
const PhotoSelectIcon = styled(Image)`
  width: 100%;
  height: 100%;
`; /*사진 선택 아이콘*/

const MenuTitle = styled(Text)`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
`; /*메뉴 제목 스타일*/

// Header Button Style
const NextHeaderBtn = styled(TouchableOpacity)`
  padding: 0px 10px;
  justify-content: center;
`; /*헤더 버튼 스타일*/
const NextHeaderTitle = styled(Text)`
  color: dodgerblue;
  font-weight: 700;
  font-size: 20px;
`; /*헤더 버튼 텍스트 스타일*/

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
  // Hook : 디바이스의 화면 크기를 가져옴 (가로/세로 크기)
  const { width: WIDTH } = useWindowDimensions();
  // Hook : Screen 이동 관련 navigationHook
  const navi = useNavigation<NativeStackNavigationProp<MainStackList>>();

  // FlatList에 띄어줄 Item(Photo)의 크기
  const itemSize = WIDTH / numColumn;
  // SelectedPhotoScrollView에 띄어줄 Item(SelectedPhoto)의 크기
  const photoSize = WIDTH * 0.75;
  // SelectedPhotoScroll 안에 업로드 이미지 여백
  const paddingLeft = (WIDTH - photoSize) / 2;

  // 사진을 선택했는지 여부를 확인하는 함수
  const isSelected = (photo: DummyPhotoType): boolean => {
    // 선텍힌 사진 리스트(selectedPhotos)에서 해당 사진의 ID를 검색
    const findIndex = selectedPhotos.findIndex(
      (asset) => asset.id === photo.id
    );
    // findIndex 안의 값에 따라 true 혹은 false
    return findIndex >= 0 ? true : false;
  };

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

  // 불러온 사진들 중에서 업로드하고 싶은 사진 선택/해제 (id 값으로 구분)
  const onSelectPhoto = (photo: DummyPhotoType) => {
    // 조건 : 선택한 사진이 이미 리스트에 있는지 확인
    // - 선택한 사진이 'selectedPhotos'안에 존재하는지?
    const findIndex = selectedPhotos.findIndex(
      (asset) => asset.id === photo.id
    );

    // 2. 이미 선택된 사진인 경우 -> 리스트에서 제거
    if (findIndex >= 0) {
      // 2-1. selectedPhotos 안에서 n번째 요소 제거
      const removedPhotoList = selectedPhotos;
      const deleteCount = 1;
      removedPhotoList.splice(findIndex, deleteCount); // splice(시작인덱스, 삭제할개수)
      // 2-2. 제거한 new 리스트로 selectedPhotos 갱신
      setSelectedPhotos([...removedPhotoList]);
    }
    // 1. 선택하지 않은 사진을 누른 경우 -> 리스트에 추가
    else {
      // 1-1. selectedPhotos 리스트에 선택한 사진 추가
      setSelectedPhotos([...selectedPhotos, photo]);
    }

    // 1. 선택하지 않은 사진 누른 경우 -> 추가

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
    getMyPhotos(); // 갤러리에서 사진 가져오기기
  }, []);

  // Hook : 컴포넌트 생성 시 '1번만' 실행되는 lifecycle 함수
  // useNaivgation과 함께 Header style을 수정하기 위해 사용
  useLayoutEffect(() => {
    // 전달할 데이터
    const params = {
      assets: selectedPhotos,
    };
    // navi, 화면 이동 함수
    // - uploadPost에 photo Props(데이터)전달
    const goToNext = () => {
      // 방어코드
      // 만약, 선택한 사진이 없으면 알림창 띄우기
      if (selectedPhotos.length === 0) {
        Alert.alert("선택한 사진 없음", "사진을 선택해주세요");
        return;
      }

      navi.navigate("UploadPost", {
        assets: selectedPhotos,
      }); // UploadPost로 이동
    };
    // Stack Navigation 옵션에 접근
    navi.setOptions({
      headerRight: () => (
        <NextHeaderBtn onPress={goToNext}>
          <NextHeaderTitle>Next</NextHeaderTitle>
        </NextHeaderBtn>
      ),
    });
  }, [selectedPhotos]);

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
        style={{ width: WIDTH, height: WIDTH }} // ScrollView 크기 설정
        contentContainerStyle={{
          gap: 10,
          paddingLeft: paddingLeft,
          alignItems: "center",
        }} // 사진 간격 설정
        snapToInterval={photoSize + 10}
        decelerationRate={"fast"}
      >
        {
          // 내가 선택한 사진들이 있다면, 하나씩 SelectedPhoto 컴포넌트를 통해 Rendering
          selectedPhotos.map((photo) => (
            <SelectedPhoto
              key={photo.id} // 고유 키 설정
              source={{ uri: photo.uri }} // 사진 URI 설정
              style={{ width: photoSize, height: photoSize }} // 사진 크기 설정
            />
          ))
        }
      </SelectedPhotoScroll>
      <MenuTitle>최신 순</MenuTitle>
      {/* B.FlatList를 활용한 갤러리에서 불러올 사진들을 보여주는 영역 */}
      <FlatList
        numColumns={numColumn} // 한 줄에 표시할 사진 개수
        data={assets} //실제 Data
        renderItem={({ item }) => {
          // Logic
          const isSelect = isSelected(item); // 선택한 사진인지 확인
          // component UI Rendering
          return (
            <Photo
              onPress={() => onSelectPhoto(item)} // 사진 클릭 시 onSelectPhoto 호출
              style={{ width: itemSize, height: itemSize }}
              // 사진 크기 설정
            >
              <PhotoImg source={{ uri: item.uri }} />
              {/* 사진 표시 */}
              {isSelect && (
                <PhotoSelectCircle>
                  <PhotoSelectIcon />
                </PhotoSelectCircle>
              )}
              {/* 사진 선택 아이콘 표시 */}
            </Photo>
          );
        }}
        // Data를 어떻게 보여줄지 (UI)
      />
    </Container>
  );
};

// 가짜(Dummy) 사진 타입
// 1. type
export type DummyPhotoType = {
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
