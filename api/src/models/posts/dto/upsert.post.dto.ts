import { PostStatusEnum } from 'src/common/enums/post.status.enum';

interface UpsertPostDTO {
  title: string;
  content: string;
  category_id: number;
  status: PostStatusEnum;
}

export default UpsertPostDTO;
