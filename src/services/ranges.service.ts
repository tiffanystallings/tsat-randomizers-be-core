import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { range } from "@prisma/client";

@Injectable()
export class RangesService {
    constructor(private prisma: PrismaService) {}

    async getTableResultByRoll(params: {table: number, roll: number, natural?: boolean}): Promise<range | null> {
        const {table, roll, natural} = params;
        console.log(params);
        return this.prisma.range.findFirst({
            where: {
                natural: natural || false,
                table,
                AND: {
                    min: {
                        lte: roll
                    },
                    max: {
                        gte: roll
                    }
                }
            }
        })
    }
}