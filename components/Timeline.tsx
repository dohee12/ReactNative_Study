import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { IPost } from "./Timeline.d";

const Container = styled(View)``;
const Title = styled(Text)``;
const Photo = styled(Image)`
  width: 100px;
  height: 100px;
`;

// onSnapshot 구독 리스너
let unsubscribe: Unsubscribe | null = null;

const Timeline = () => {
  // Posts 정보
  const [posts, setPosts] = useState<IPost[]>([]);
  // 서버(=Firebase) 에서 업로드한 포스트 가져오기
  const getPosts = async () => {
    // 1. 다운로드 받을 파일(=doc)의 경로(in Firestore)
    const path = collection(db, "posts");
    const condition = orderBy("createdAt", "desc");
    // 2. 해당 파일'들'을 여러 조건(최신순)에 맞게 가져온다.(Query)
    const postsQuery = query(path, condition);
    // 3. 쿼리문을 통해 해당 파일들을 다운로드
    const snapshot = await getDocs(postsQuery);
    // 4. 가져온 Posts정보들을 분류
    const newPosts = snapshot.docs.map((doc) => {
      // 1. doc 안에 값들을 꺼낸다
      const { userId, caption, createdAt, nickname, photos } =
        doc.data() as IPost;
      // 2. 꺼낸 값들을 Timeline에 쓸 수 있게 분류한다.
      const result = {
        id: doc.id,
        userId,
        createdAt,
        nickname,
        caption,
        photos,
      };
      return result;
    });
    // 5. 분류한 Data들을 저장(=State)
    setPosts(newPosts);

    // + Realtime DB (실시간 포스트를 받아와 갱신)
    // Snapshot 비교를 위한 Listner
    // unsubscribe = onSnapshot(쿼리,처리문);
  };

  // Timeline 페이지가 생성되는 순간, 1번 자동으로 가져온다
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      {posts &&
        posts.map((post, index) => {
          return (
            <View key={index}>
              {post.photos && <Photo source={{ uri: post.photos[0] }} />}
              <Title>{post.userId}</Title>
              <Title>{post.nickname}</Title>
              <Title>{post.caption}</Title>
              <Title>{post.createdAt}</Title>
            </View>
          );
        })}
    </Container>
  );
};

export default Timeline;
