export class GroupToleranceDTO {
    minGroupSize!: number;
    maxGroupSize!: number;
}

export class CreateSpeciesDTO {
    name!: string;
    habitatType!: string;
    diet!: string[];
    endangermentStatus!: string;
    groupTolerance!: GroupToleranceDTO;
}

export class UpdateSpeciesDTO {
    name?: string;
    habitatType?: string;
    diet?: string[];
    endangermentStatus?: string;
    groupTolerance?: GroupToleranceDTO;
}

export class SpeciesQueryDTO {
    q?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}
