export type ApiSortOrder = 'asc' | 'desc';

export interface SpeciesGroupTolerance {
  minGroupSize: number;
  maxGroupSize: number;
}

export interface Species {
  id: number;
  name: string;
  habitatType: string;
  diet: string[];
  endangermentStatus: string;
  groupTolerance: SpeciesGroupTolerance;
  monkeys?: Monkey[];
}

export interface Monkey {
  id: number;
  name: string;
  description: string;
  country: string;
  gender: string;
  weight: number;
  height: number;
  year: number;
  likes: number;
  personality_trait: string;
  image: string;
  species?: Species;
  species_id?: number;
}

export interface EntityQueryParams {
  q?: string;
  sortField?: string;
  sortOrder?: ApiSortOrder;
}

export type CreateMonkeyPayload = Omit<Monkey, 'id' | 'species' | 'species_id'> & {
  species_id: number;
};

export type UpdateMonkeyPayload = Partial<CreateMonkeyPayload>;

export type CreateSpeciesPayload = Omit<Species, 'id'>;

export type UpdateSpeciesPayload = Partial<CreateSpeciesPayload>;
