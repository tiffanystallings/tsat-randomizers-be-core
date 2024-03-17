import { Controller, Get, Param } from "@nestjs/common";
import { KeywordsService } from "./keywords.service";
import { keyword as KeywordModel } from "@prisma/client";

enum TYPE { NOUN=2, VERB=1 }

@Controller('keywords')
export class KeywordsController {
    constructor(private readonly keywordsService: KeywordsService) {}

    @Get(':type/:roll')
    async rollKeywordByType(@Param('type') table: string,
                            @Param('roll') roll: string): Promise<KeywordModel> {
        return this.keywordsService.keyword({ table: Number(table), roll: Number(roll) })
    }

    @Get('many/:type/:quantity')
    async rollMultipleKeyword(@Param('type') table: string,
                              @Param('quantity') quantity: string): Promise<KeywordModel[]> {
        const rollTotal: number = Number(quantity);

        const min = Math.ceil(1);
        const max = Math.floor(100);
        let rolls: number[] = [];

        for (let i: number = 0; i < rollTotal; i++) {
            rolls.push(Math.floor((Math.random() * max) + min));
        }

        console.log(rolls);
        return this.keywordsService.keywordMany({ table: Number(table), roll: rolls});
    }
}