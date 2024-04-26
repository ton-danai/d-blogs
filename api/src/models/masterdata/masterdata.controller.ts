import { Controller, Get } from '@nestjs/common';
import { MasterdataService } from './masterdata.service';
import { Public } from 'src/auth/auth.decorator';

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
}
