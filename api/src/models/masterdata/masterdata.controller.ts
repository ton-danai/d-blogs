import { Controller, Get } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { Public } from 'src/auth/auth.decorator';
import TopTenDTO from '../dto/top.ten.dto';

@Controller('masterdata')
export class MasterdataController {
  constructor(private masterService: MasterdataService) {}

  @Get('/categories')
  @Public()
  async getCategoris() {
    const result = await this.masterService.getCategory();

    return {
      categories: result,
    };
  }

  @Get('/categories/top10')
  @Public()
  async getCategorisTopTen(): Promise<TopTenDTO[]> {
    const result = await this.masterService.getTopTenCategory();

    return result;
  }
}
