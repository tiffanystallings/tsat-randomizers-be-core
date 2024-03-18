import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { KeywordsService } from './services/keywords.service';
import { KeywordsController } from './controllers/keywords.controller';
import { PrismaService } from './services/prisma.service';
import { TablesService } from './services/tables.service';
import { CoreUtils } from './utils/core.util';
import { OracleController } from './controllers/oracle.controller';
import { RangesService } from './services/ranges.service';

@Module({
  imports: [],
  controllers: [
    AppController, 
    KeywordsController,
    OracleController
  ],
  providers: [
    AppService, 
    KeywordsService, 
    PrismaService, 
    TablesService,
    RangesService,
    CoreUtils
  ],
})
export class AppModule {}
