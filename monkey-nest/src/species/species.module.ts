import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Species, SpeciesSchema } from "./species.schema";
import { Monkey, MonkeySchema } from "src/monkeys/monkey.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Species.name, schema: SpeciesSchema }]),
        MongooseModule.forFeature([{ name: Monkey.name, schema: MonkeySchema }])
    ],
    controllers: [SpeciesController],
    providers: [SpeciesService]
})
export class SpeciesModule { }
