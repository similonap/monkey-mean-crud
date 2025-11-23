import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MonkeyFormComponent, MonkeyFormValue } from '../../components/monkey-form/monkey-form.component';
import { CreateMonkeyPayload, Monkey, Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-monkey-create-page',
  imports: [MonkeyFormComponent],
  templateUrl: './monkey-create-page.html',
  styleUrl: './monkey-create-page.css',
})
export class MonkeyCreatePage implements OnInit {
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  speciesList = signal<Species[]>([]);
  loading = signal<boolean>(true);
  saving = signal<boolean>(false);
  error = signal<string | null>(null);
  initialData: Partial<Monkey> = {
    name: '',
    country: '',
    gender: '',
    description: '',
    image: 'http://localhost:3000/images/monkey-demo-1.jpg',
    personality_trait: '',
    likes: 0,
    year: new Date().getFullYear(),
    height: 0,
    weight: 0,
    species_id: 0,
  };

  ngOnInit(): void {
    this.loadSpecies();
  }

  private loadSpecies(): void {
    this.loading.set(true);
    this.monkeyApi.getSpecies().subscribe({
      next: (species) => {
        this.speciesList.set(species);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load species list', err);
        this.error.set('Unable to load species. Try again later.');
        this.loading.set(false);
      },
    });
  }

  handleSubmit(value: MonkeyFormValue): void {
    const payload = this.buildPayload(value);
    this.saving.set(true);

    this.monkeyApi.createMonkey(payload).subscribe({
      next: (created) => {
        this.saving.set(false);
        this.router.navigate(['/monkeys', created.id]);
      },
      error: (err) => {
        console.error('Failed to create monkey', err);
        this.error.set('Saving failed. Please try again.');
        this.saving.set(false);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/monkeys']);
  }

  private buildPayload(value: MonkeyFormValue): CreateMonkeyPayload {
    return {
      name: value.name,
      country: value.country,
      gender: value.gender,
      description: value.description,
      image: value.image,
      personality_trait: value.personality_trait,
      likes: Number(value.likes),
      year: Number(value.year),
      height: Number(value.height),
      weight: Number(value.weight),
      species_id: Number(value.species_id),
    } as CreateMonkeyPayload;
  }
}
