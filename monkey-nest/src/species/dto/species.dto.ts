import { ApiProperty, PartialType } from "@nestjs/swagger";

export class GroupToleranceDTO {
    @ApiProperty()
    minGroupSize!: number;
    @ApiProperty()
    maxGroupSize!: number;
}

export class CreateSpeciesDTO {
    @ApiProperty()
    name!: string;
    @ApiProperty()
    habitatType!: string;
    @ApiProperty()
    diet!: string[];
    @ApiProperty()
    endangermentStatus!: string;
    @ApiProperty()
    groupTolerance!: GroupToleranceDTO;
}

export class UpdateSpeciesDTO extends PartialType(CreateSpeciesDTO) {}

export class SpeciesQueryDTO {
    @ApiProperty({ required: false })
    q?: string;

    @ApiProperty({ required: false, default: 'id' })
    sortField?: string;

    @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
    sortOrder?: 'asc' | 'desc';
}