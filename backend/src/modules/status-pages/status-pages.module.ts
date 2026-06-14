import { Module } from '@nestjs/common';
import { StatusPageController } from './status-page.controller';
import { StatusPageService } from './status-page.service';

@Module({
  controllers: [StatusPageController],
  providers: [StatusPageService]
})
export class StatusPagesModule {}
