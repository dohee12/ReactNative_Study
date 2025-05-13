import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

const BtnContainer = styled(TouchableOpacity)`
  padding: 0px 20px;
  justify-content: center;
`;
const Title = styled(Text)`
  color: dodgerblue;
  font-weight: 700;
  font-size: 20px;
`;

// 전달 받을 데이터(props)의 타입
type Props = {
  title: string;
  onPress: () => void;
};

// 커스텀 영역 : 1. 버튼의 제목 / 2. 버튼의 기능
export default ({ title, onPress }: Props) => {
  return (
    <BtnContainer onPress={onPress}>
      <Title>{title}</Title>
    </BtnContainer>
  );
};
