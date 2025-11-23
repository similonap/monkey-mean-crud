import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpeciesDocument = HydratedDocument<Species>;

@Schema()
export class Species {
    @Prop({ type: Number, required: true, unique: true })
    id!: number;

    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: String, required: true })
    habitatType!: string;

    @Prop({ type: [String], required: true })
    diet!: string[];

    @Prop({ type: String, required: true })
    endangermentStatus!: string;

    @Prop({ 
        type: Object,
        required: true,
        properties: {
            minGroupSize: { type: Number, required: true },
            maxGroupSize: { type: Number, required: true },
        }
    })
    groupTolerance!: { minGroupSize: number; maxGroupSize: number; };
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);