import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { all_table } from "../generated/client";

@Injectable()
export class TablesService {
    constructor(private prisma: PrismaService) {}

    async getTableById(params: {id: number}): Promise<all_table | null> {
        const { id } = params;

        return this.prisma.all_table.findUnique({
            where: {
                id
            }
        });
    }

}