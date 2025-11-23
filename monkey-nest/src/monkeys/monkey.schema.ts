import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Species } from "src/species/species.schema";

export type MonkeyDocument = HydratedDocument<Monkey>;

@Schema()
export class Monkey {
    @Prop({ type: Number, required: true, unique: true })
    id!: number;

    @Prop({ type: String, required: true })
    name!: string;

    @Prop({ type: String, required: true })
    description!: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Species.name })
    species: Species;

    @Prop({ type: String, required: true })
    country!: string;

    @Prop({ type: String, required: true })
    gender!: string;

    @Prop({ type: Number, required: true })
    weight!: number;

    @Prop({ type: Number, required: true })
    height!: number;

    @Prop({ type: Number, required: true })
    year!: number;

    @Prop({ type: Number, required: true })
    likes!: number;

    @Prop({ type: String, required: true })
    personality_trait!: string;

    @Prop({ type: String, required: true })
    image!: string;
}

export const MonkeySchema = SchemaFactory.createForClass(Monkey);