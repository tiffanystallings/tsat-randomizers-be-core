import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { all_table } from "@prisma/client";
import { RangesService } from "src/services/ranges.service";
import { TablesService } from "src/services/tables.service";
import { CoreUtils } from "src/utils/core.util";

enum TABLE { SIMPLE_QA = 3, ORACLE_IMPROVED = 5, ORACLE_ALTERNATE = 7}

@Controller('oracle')
export class OracleController {
    constructor(private readonly rangeService: RangesService,
                private readonly tableService: TablesService,
                private readonly coreUtils: CoreUtils) {}

    @Get(':type/:modifier')
    async rollQAWithModifier(@Param('type') type: string, @Param('modifier') mod: string) {
        const modifier: number = Number(mod);
        let table: number;

        // Get table ID from type
        if (type === 'simple') {
            table = TABLE.SIMPLE_QA;
        } else if (type === 'improved') {
            table = TABLE.ORACLE_IMPROVED;
        } else if (type === 'alt') {
            table = TABLE.ORACLE_ALTERNATE;
        } else {
            throw new HttpException('Oracle type not found.', HttpStatus.NOT_FOUND);
        }

        return this.tableService.getTableById({id: table}).then((tableRecord: all_table) => {
            // Get dice roll
            const roll: number = this.coreUtils.rollDice(tableRecord.min_roll, tableRecord.max_roll, 1)[0];
            
            // Check for nat highest or nat lowest roll
            const natural: boolean = (roll === tableRecord.min_roll || roll === tableRecord.max_roll) && table === TABLE.ORACLE_ALTERNATE;

            let modifiedRoll: number;
            // Cap the min and the max rolls and add modifier
            if (!natural && roll + modifier <= tableRecord.min_roll) {
                modifiedRoll = tableRecord.min_roll;
            } else if (!natural && roll + modifier >= tableRecord.max_roll) {
                modifiedRoll = tableRecord.max_roll
            } else if (!natural) {
                modifiedRoll = roll + modifier;
            } else {
                modifiedRoll = roll
            }

            return this.rangeService.getTableResultByRoll({table, roll: modifiedRoll, natural});
        });
        

        
    }
}