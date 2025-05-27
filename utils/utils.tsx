/**
 * Gallery Image(타입:Assets)을 Blob(Binary Laribray object)로 변환하는 함수
 * @param uri image uri
 * @returns data(type of blob)
 */
export const assetsToBlob = async (uri: string) => {
  // 1. network에서 uri에 해당하는 데이터를 받아와서
  const response = await fetch(uri);
  // 2. blob 형태의 데이터로 변환
  const blob = await response.blob();
  // 3. return
  return blob;
};
