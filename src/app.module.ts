import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, KeywordsController],
  providers: [AppService, KeywordsService, PrismaService],
})
export class AppModule {}
