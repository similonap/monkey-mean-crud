import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateMonkeyPayload, Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-monkey-create-page',
  imports: [ReactiveFormsModule, RouterLink],
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
  private readonly currentYear = new Date().getFullYear();

  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    species_id: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gender: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weight: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    height: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    year: new FormControl<number | null>(null, {
      validators: [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currentYear),
      ],
    }),
    likes: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    image: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    personality_trait: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
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

  private buildPayload(): CreateMonkeyPayload {
    const value = this.form.getRawValue();
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
