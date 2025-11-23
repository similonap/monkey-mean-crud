import { Species } from "src/species/species.schema";
import { Monkey } from "../monkey.schema";
import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";

export class CreateMonkeyDTO {
    @ApiProperty()
    name!: string;
    @ApiProperty()
    description!: string;
    @ApiProperty()
    country!: string;
    @ApiProperty()
    gender!: string;
    @ApiProperty()
    weight!: number;
    @ApiProperty()
    height!: number;
    @ApiProperty()
    year!: number;
    @ApiProperty()
    likes!: number;
    @ApiProperty()
    personality_trait!: string;
    @ApiProperty()
    image!: string;
    @ApiProperty()
    species_id!: number;
}

export class UpdateMonkeyDTO extends PartialType(CreateMonkeyDTO) {
    species_id?: number;
}

export class MonkeyQueryDTO {
    @ApiProperty({ required: false })
    q?: string;

    @ApiProperty({ required: false, default: 'id' })
    sortField?: string;

    @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
    sortOrder?: 'asc' | 'desc';
}