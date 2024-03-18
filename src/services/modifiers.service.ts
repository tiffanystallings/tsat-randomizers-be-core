import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ModifiersService {
    constructor(private prisma: PrismaService) {}
}