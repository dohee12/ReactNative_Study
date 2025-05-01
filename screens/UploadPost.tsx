import { Image, Text, View } from "react-native";
import styled from "styled-components";
import { MainStackList } from "../stacks/MainStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// styled-components를 사용하여 스타일링된 컴포넌트 생성
const Container = styled(View)``; // 화면 전체를 감싸는 컨테이너
const Title = styled(Text)``; // 제목 텍스트 스타일

const PhotoBox = styled(View)`
  width: 150px;
  height: 150px;
`;
const Photo = styled(Image)`
  width: 100%;
  height: 100%;
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

  return (
    // 화면 렌더링
    <Container>
      {/* 업로드 페이지 제목 */}
      <Title>Upload Page......</Title>
      <PhotoBox>
        <Photo source={{ uri: photos[0].uri }} />
      </PhotoBox>
    </Container>
  );
};
