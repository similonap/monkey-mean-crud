import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Monkey } from "src/monkeys/monkey.schema";
import { Species, SpeciesDocument } from "./species.schema";
import { Model } from "mongoose";
import { CreateSpeciesDTO, UpdateSpeciesDTO } from "./dto/species.dto";

@Injectable()
export class SpeciesService {
    constructor(@InjectModel(Species.name) private speciesModel: Model<SpeciesDocument>) { }

    async findAll(q: string = '', sortField: string = 'id', sortOrder: 'asc' | 'desc' = 'asc'): Promise<Species[]> {
        return this.speciesModel.find(
            { name: new RegExp(q, 'i') }
        ).sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }).lean().exec();
    }

    async findOne(id: number): Promise<Species | null> {
        const entry = this.speciesModel.findOne({ id }).lean().exec();
        if (!entry) throw new NotFoundException('Item not found');
        return entry;
    }


    async create(dto: CreateSpeciesDTO): Promise<Species> {
        const last = await this.speciesModel.findOne({}, { id: 1 }).sort({ id: -1 }).lean().exec();
        const nextId = last?.id ? Number(last.id) + 1 : 1;

        const toCreate = { ...dto, id: nextId } as Species;
        const created = await this.speciesModel.create(toCreate);
        return created.toObject() as Species;
    }

    async remove(id: number): Promise<void> {
        const res = await this.speciesModel.deleteOne({ id }).exec();
        if (res.deletedCount === 0) {
            throw new NotFoundException('Item not found');
        }
    }

    async update(id: number, payload: UpdateSpeciesDTO): Promise<Species> {
        const updated = await this.speciesModel.findOneAndUpdate(
            { id },
            { $set: { ...payload, id } },
            { new: true }
        ).lean().exec();
        if (!updated) {
            throw new NotFoundException('Item not found');
        }
        return updated as Species;
    }
}
