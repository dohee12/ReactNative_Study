import { ActivityIndicator, View } from "react-native";
import styled from "styled-components";
import { primaryColor } from "../styles/style";

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  justify-content: center; /* 상,중,하에서 가운데 */
  align-items: center; /**왼,중,오에서 가운데데 */
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator size={"large"} color={primaryColor} />
    </Container>
  );
};
