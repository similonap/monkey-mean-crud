import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Monkey, MonkeyDocument } from "./monkey.schema";
import { CreateMonkeyDTO, UpdateMonkeyDTO } from "./dto/monkey.dto";
import { Species, SpeciesDocument } from "src/species/species.schema";

@Injectable()
export class MonkeysService {

    constructor(@InjectModel(Monkey.name) private monkeyModel: Model<MonkeyDocument>,
            @InjectModel(Species.name) private speciesModel: Model<SpeciesDocument>,
    ) { }

    async findAll(q: string = '', sortField: string = 'id', sortOrder: 'asc' | 'desc' = 'asc'): Promise<Monkey[]> {
        return this.monkeyModel.find(
            { name: new RegExp(q, 'i') }
        ).populate("species").sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }).lean().exec();
    }

    async findOne(id: number): Promise<Monkey | null> {
        const entry = this.monkeyModel.findOne({ id }).populate("species").lean().exec();
        return entry;
    }

    async create(dto: CreateMonkeyDTO): Promise<Monkey> {
        const last = await this.monkeyModel.findOne({}, { id: 1 }).sort({ id: -1 }).lean().exec();
        const nextId = last?.id ? Number(last.id) + 1 : 1;

        let species = await this.speciesModel.findOne({ id: dto.species_id }).exec();
        if (!species) {
            throw new Error('Species not found');
        }

        const toCreate = { ...dto, species: species, id: nextId } as Monkey;
        const created = await this.monkeyModel.create(toCreate);
        return created.toObject() as Monkey;
    }

    async remove(id: number): Promise<void> {
        await this.monkeyModel.deleteOne({ id }).exec();
    }

    async update(id: number, payload: UpdateMonkeyDTO): Promise<Monkey> {
        let updated = await this.monkeyModel.findOneAndUpdate(
            { id },
            { $set: { ...payload, id } },
            { new: true }
        ).populate("species").lean().exec();

        if (payload.species_id !== undefined) {
            const species = await this.speciesModel.findOne({ id: payload.species_id }).exec();
            if (!species) {
                throw new Error('Species not found');
            }
            updated = await this.monkeyModel.findOneAndUpdate(
                { id },
                { $set: { ...payload, species: species} },
                { new: true }
            ).populate("species").lean().exec();
            
        }
        return updated as Monkey;
    }

}
