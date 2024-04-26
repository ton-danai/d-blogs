import { PostStatusEnum } from 'src/common/enums/post.status.enum';

interface MyPostDTO {
  id: number;
  title: string;
  category_id: number;
  category_name?: string;
  status: PostStatusEnum;
  publish_date: Date | null | undefined;
}

export default MyPostDTO;
