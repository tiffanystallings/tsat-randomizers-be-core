import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { range } from "@prisma/client";

@Injectable()
export class RangesService {
    constructor(private prisma: PrismaService) {}

    async getTableResultByRoll(params: {table: number, roll: number, natural?: boolean}) {
        const {table, roll, natural} = params;

        return this.prisma.range.findFirst({
            where: {
                
            }
        })
    }
}