import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Species, SpeciesSchema } from "./species.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Species.name, schema: SpeciesSchema }]),
    ],
    controllers: [SpeciesController],
    providers: [SpeciesService]
})
export class SpeciesModule { }
