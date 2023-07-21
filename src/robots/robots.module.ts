import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RobotsService],
  exports: [RobotsService],
})
export class RobotsModule {}
