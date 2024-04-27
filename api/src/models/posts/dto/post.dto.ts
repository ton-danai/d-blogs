import { PostStatusEnum } from 'src/common/enums/post.status.enum';

interface PostDTO {
  id: number;
  title: string;
  category_id?: number;
  category_name?: string;
  content?: string;
  status: PostStatusEnum;
  publish_date: Date | null | undefined;
  author: string;
  likes?: number;
}

export default PostDTO;
