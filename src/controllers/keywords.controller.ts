import { Controller, Get, Param } from "@nestjs/common";
import { KeywordsService } from "../services/keywords.service";
import { keyword as KeywordModel, all_table as TableModel } from "@prisma/client";
import { TablesService } from "../services/tables.service";
import { CoreUtils } from "src/utils/core.util";

enum TYPE { NOUN=2, VERB=1 }

@Controller('keywords')
export class KeywordsController {
    constructor(private readonly keywordsService: KeywordsService,
                private readonly tablesService: TablesService,
                private readonly coreUtils: CoreUtils) {}

    @Get(':type/:roll')
    async rollKeywordByType(@Param('type') table: string,
                            @Param('roll') roll: string): Promise<KeywordModel> {
        return this.keywordsService.keyword({ table: Number(table), roll: Number(roll) })
    }

    @Get('many/:type/:quantity')
    async rollMultipleKeyword(@Param('type') table: string,
                              @Param('quantity') quantity: string): Promise<KeywordModel[]> {
        const rollTotal: number = Number(quantity);
        
        return this.tablesService.getTableById({ id: Number(table) }).then((rollTable: TableModel) => {
            let rolls: number[] = this.coreUtils.rollDice(rollTable.min_roll, rollTable.max_roll, rollTotal);
            
            return this.keywordsService.keywordMany({ table: Number(table), roll: rolls});
        });
    }
}