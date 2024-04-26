import { PostStatusEnum } from 'src/common/enums/post.status.enum';

interface CreatePostDTO {
  title: string;
  content: string;
  category_id: number;
  status: PostStatusEnum;
}

export default CreatePostDTO;
