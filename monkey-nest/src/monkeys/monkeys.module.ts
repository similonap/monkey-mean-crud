import { Module } from '@nestjs/common';
import { MonkeysService } from './monkeys.service';
import { MonkeysController } from './monkeys.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Monkey, MonkeySchema } from "./monkey.schema";
import { Species, SpeciesSchema } from "src/species/species.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Monkey.name, schema: MonkeySchema }]),
        MongooseModule.forFeature([{ name: Species.name, schema: SpeciesSchema }]),
    ],
    providers: [MonkeysService],
    controllers: [MonkeysController]
})
export class MonkeysModule { }
