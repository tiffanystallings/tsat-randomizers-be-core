import { Controller, Get, Param } from "@nestjs/common";
import { KeywordsService } from "./keywords.service";
import { keyword as KeywordModel, all_table as TableModel } from "@prisma/client";
import { TablesService } from "./tables.service";

enum TYPE { NOUN=2, VERB=1 }

@Controller('keywords')
export class KeywordsController {
    constructor(private readonly keywordsService: KeywordsService,
                private readonly tablesService: TablesService) {}

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
            const min = Math.ceil(rollTable.min_roll);
            const max = Math.floor(rollTable.max_roll);

            let rolls: number[] = [];

            for (let i: number = 0; i < rollTotal; i++) {
                rolls.push(Math.floor((Math.random() * max) + min));
            }
    
            return this.keywordsService.keywordMany({ table: Number(table), roll: rolls});
        });
    }
}