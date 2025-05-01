import { ActivityIndicator, View } from "react-native";
import styled from "styled-components";
import { primaryColor } from "../styles/style";

// 화면 전체를 감싸는 컨테이너 스타일 정의
const Container = styled(View)`
  flex: 1; /* 화면 전체를 차지 */
  background-color: #fff; /* 배경색을 흰색으로 설정정 */
  justify-content: center; /* 상,중,하에서 가운데 */
  align-items: center; /**왼,중,오에서 가운데데 */
`;

// LoadingScreen 컴포넌트 정의
export default () => {
  return (
    // 화면 렌더링
    <Container>
      {/* 로딩 스피너 표시 */}
      <ActivityIndicator size={"large"} color={primaryColor} />
    </Container>
  );
};
