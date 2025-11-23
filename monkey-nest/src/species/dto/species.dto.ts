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