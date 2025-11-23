export class CreateMonkeyDTO {
    name!: string;
    description!: string;
    country!: string;
    gender!: string;
    weight!: number;
    height!: number;
    year!: number;
    likes!: number;
    personality_trait!: string;
    image!: string;
    species_id!: number;
}

// Everything optional for updates
export class UpdateMonkeyDTO {
    name?: string;
    description?: string;
    country?: string;
    gender?: string;
    weight?: number;
    height?: number;
    year?: number;
    likes?: number;
    personality_trait?: string;
    image?: string;
    species_id?: number;
}

export class MonkeyQueryDTO {
    q?: string;
    sortField?: string;     // default applied in controller logic
    sortOrder?: 'asc' | 'desc';
}