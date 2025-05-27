import { Image, Text, View } from "react-native";
import styled from "styled-components";
import { MainStackList } from "../stacks/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput } from "react-native-gesture-handler";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import HeaderRightBtn from "../components/HeaderRightBtn";
import UploadLoadingScreen from "../components/upload-loading-screen";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection, LoadBundleTask } from "firebase/firestore";
import { auth, db, storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { assetsToBlob } from "../utils/utils";

// styled-components를 사용하여 스타일링된 컴포넌트 생성
const Container = styled(View)`
  background-color: white;
  flex: 1;
`; // 화면 전체를 감싸는 컨테이너
const Title = styled(Text)``; // 제목 텍스트 스타일

const PhotoBox = styled(View)`
  width: 115px;
  height: 115px;
`;
const Photo = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Icon = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Blind = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  border-radius: 10px;
`;

const IconBox = styled(View)`
  width: 25%;
  height: 25%;
  margin: 5%;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 0px;
  border-radius: 50%;
`;

const UploadPost = styled(View)`
  flex-direction: row;
  padding: 20px;
`;

const Caption = styled(View)`
  flex: 1;
`;

const CaptionInput = styled(TextInput)`
  font-size: 20px;
`;

// 'UploadPost'가 'navigation'을 통해 전달받는 Props의 타입/구조
type Props = NativeStackScreenProps<MainStackList, "UploadPost">;

// 외부에 전달받은 데이터인 props
// props를 구조분해(Destructing) 내부에 있는 'route' 값에 접근
// route를 또 한번 구조분해하여 내부에 있는 'params' 값에 접근
export default ({ route: { params } }: Props) => {
  // 전달받은 데이터 중, 임의의 데이터 가져오기
  // 예외처리, 만일 photos 값이 없는 경우(null), 빈배열 반환
  const photos = params.assets ?? [];
  // State : 내가 작성한 글(Caption)을 저장할 State 생성
  const [caption, setCaption] = useState<string>("");
  // State : 로딩화면을 위한 state
  const [loading, setLoading] = useState<boolean>(false);
  // Naigation Hook
  const navi = useNavigation();
  // 글을 작성할 때 호출되어 caption(state)에 수정한 글 반영
  const onChangeText = (text: string) => {
    setCaption(text);
  };

  // (비동기형) 데이터를 Server에 업로드
  const onUpload = async () => {
    // 0. 방어코드 : caption을 작성하지 않은 경우 업로드 불가
    // 1. 필요한 데이터
    // ㄴ a. caption(작성글) / b. photos(선택한사진들)
    // 2. 서버에 업로드(with.인터넷 통신.. 속도차이)
    // 2-a. 정상실행
    try {
      // --- 로딩 시작 ---
      setLoading(true);
      // 서버 업로드 Process
      // A. firestore => 데이터 저장
      // 1. 데이터 저장위치 필요 (접근할firestoreDB, 접근할 collection 이름름)
      const path = collection(db, "posts");
      // 2. 저장할 데이터 구조화
      const uploadData = {
        nickname: auth.currentUser?.displayName, // 현재 로그인한 유저의 닉네임
        userId: auth.currentUser?.uid, // 현재 로그인한 유저의 ID
        caption: caption, // 작성한 글
        createAt: Date.now(), // 업로드 시간
      };
      // 3. firestore에 업로드
      const doc = await addDoc(path, uploadData);

      // B. storage => Media(오디오, 비디오, 사진...)
      const uploadPhotos = [];
      // 2. 업로드할 이미지'들' ... for문
      for (const photo of photos) {
        // 1. 업로드할 위치(=> storage)
        // 위치 : posts/업로드유저ID/업로드한DocId/파일이름.확장자
        const storagePath = `posts/${auth.currentUser?.uid}/${doc.id}/${photo.id}`;
        const localRef = ref(storage, storagePath);
        // [pass].. 업로드할 이미지를 변환(Convert)
        const blob = await assetsToBlob(photo.uri);
        const task = await uploadBytesResumable(localRef, blob);
        // 3. Storage에 업로드(with Server)
        // 3-a. uri 이미지로부터 다운로드
        const url = await getDownloadURL(task.ref);
        // 3-b. 받은 이미지를 uploadPhotos에 추가
        uploadPhotos.push(url);
      }
      // for문이 끝나면 Storage 업로드

      // 로딩 완료 ==> 정상적으로 서버 업로드 완료료
      // 알림창, 페이지를 홈화면으로 이동
    } catch (error) {
      // 2-b. 오류발생
      console.error(error);
      // --- 로딩 완료 ---
      // setLoading(false);
    } finally {
      // --- 정상 업로드 or 에러 발생 시 어느 경우에도 끝나면 로딩 완료 ---
      setLoading(false);
    }
  };

  // Header 부분에 Upload 버튼을 만들기 위해 사용
  useLayoutEffect(() => {
    // Header 우측에 Upload 버튼 생성
    navi.setOptions({
      headerRight: () => <HeaderRightBtn title="Upload" onPress={onUpload} />,
    });
  }, [caption]);

  return (
    // 화면 렌더링
    <Container>
      <UploadPost>
        <PhotoBox>
          <Photo source={{ uri: photos[0].uri }} />
          <Blind />
          {/* 선택한 사진이 2장 이상인 경우에만 표현 */}
          {photos.length > 1 && (
            <IconBox>
              {/* <Icon
            source={require("../assets/icons/9104345_copy_duplicate_paste_clipboard_data_icon.png")}
          /> */}
              <AntDesign name="laptop" size={30} color={"white"} />
            </IconBox>
          )}
        </PhotoBox>
        <Caption>
          <CaptionInput
            multiline={true}
            placeholder="글을 작성해주세요..."
            placeholderTextColor={"#a8a8a8"}
            onChangeText={(text) => onChangeText(text)}
            value={caption}
          />
        </Caption>
      </UploadPost>
      {/* 업로드 Process가 실행되는 경우에만 나타남 */}
      {loading && <UploadLoadingScreen />}
    </Container>
  );
};
