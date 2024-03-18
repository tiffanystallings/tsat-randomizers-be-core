import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { keyword } from "@prisma/client";

@Injectable()
export class KeywordsService {
    constructor(private prisma:PrismaService) {}

    async keyword (params: {table: number, roll: number}): Promise <keyword | null> {
        const {table, roll} = params;
        return this.prisma.keyword.findFirst({
            
            where: {
                table,
                roll
            }
        });
    }

    async keywordMany (params: {table: number, roll: number[]}): Promise <keyword[] | null> {
        const {table, roll} = params;
        return this.prisma.keyword.findMany({
            
            where: {
                table,
                roll: { in: roll }
            }
        });
    }
}