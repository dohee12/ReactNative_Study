/**
 * User가 업로드한 Post 데이터 형태
 */
export interface IPost {
  /** 작성시간(UTC) */
  createdAt: number;
  /** 작성자 ID*/
  userId: string;
  /** 작성자 별명 */
  nickname: string;
  /** 작성 내용 */
  caption: string;
  /** 첨부 이미지 */
  photos?: string[];
}
