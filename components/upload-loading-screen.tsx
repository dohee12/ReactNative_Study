import { ActivityIndicator, Text, View } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled(Text)`
  color: white;
  font-size: 13px;
`;

type Props = {
  title?: string;
};

export default ({ title = "Uploading" }: Props) => {
  return (
    <Container>
      <ActivityIndicator color={"#fff"} size={"large"} />
      <Title>{title}</Title>
    </Container>
  );
};
