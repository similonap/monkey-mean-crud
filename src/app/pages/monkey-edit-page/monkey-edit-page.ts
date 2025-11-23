import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Monkey, Species, UpdateMonkeyPayload } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-monkey-edit-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './monkey-edit-page.html',
  styleUrl: './monkey-edit-page.css',
})
export class MonkeyEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  monkeyId: number | null = null;
  speciesList = signal<Species[]>([]);
  loading = signal<boolean>(true);
  saving = signal<boolean>(false);
  error = signal<string | null>(null);
  private readonly currentYear = new Date().getFullYear();

  readonly detailLink = computed(() =>
    this.monkeyId ? ['/monkeys', this.monkeyId] : ['/monkeys']
  );

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
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      this.error.set('No monkey id provided.');
      this.loading.set(false);
      return;
    }

    this.monkeyId = id;
    this.loadFormData(id);
  }

  private loadFormData(id: number): void {
    this.loading.set(true);
    forkJoin({
      monkey: this.monkeyApi.getMonkeyById(id),
      species: this.monkeyApi.getSpecies(),
    }).subscribe({
      next: ({ monkey, species }) => {
        this.speciesList.set(species);
        this.patchForm(monkey);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load edit data', err);
        this.error.set('Unable to load monkey information.');
        this.loading.set(false);
      },
    });
  }

  private patchForm(monkey: Monkey): void {
    this.form.patchValue({
      name: monkey.name,
      species_id: monkey.species_id ?? monkey.species?.id ?? null,
      country: monkey.country,
      gender: monkey.gender,
      weight: monkey.weight,
      height: monkey.height,
      year: monkey.year,
      likes: monkey.likes,
      image: monkey.image,
      personality_trait: monkey.personality_trait,
      description: monkey.description,
    });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.monkeyId) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const payload = this.buildPayload();

    this.monkeyApi.updateMonkey(this.monkeyId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/monkeys', this.monkeyId]);
      },
      error: (err) => {
        console.error('Failed to update monkey', err);
        this.error.set('Saving failed. Please try again.');
        this.saving.set(false);
      },
    });
  }

  onCancel(): void {
    if (this.monkeyId) {
      this.router.navigate(['/monkeys', this.monkeyId]);
    } else {
      this.router.navigate(['/monkeys']);
    }
  }

  private buildPayload(): UpdateMonkeyPayload {
    const formValue = this.form.value;
    return {
      name: formValue.name ?? undefined,
      country: formValue.country ?? undefined,
      gender: formValue.gender ?? undefined,
      description: formValue.description ?? undefined,
      image: formValue.image ?? undefined,
      personality_trait: formValue.personality_trait ?? undefined,
      likes:
        formValue.likes !== null && formValue.likes !== undefined
          ? Number(formValue.likes)
          : undefined,
      year:
        formValue.year !== null && formValue.year !== undefined
          ? Number(formValue.year)
          : undefined,
      height:
        formValue.height !== null && formValue.height !== undefined
          ? Number(formValue.height)
          : undefined,
      weight:
        formValue.weight !== null && formValue.weight !== undefined
          ? Number(formValue.weight)
          : undefined,
      species_id:
        formValue.species_id !== null && formValue.species_id !== undefined
          ? Number(formValue.species_id)
          : undefined,
    };
  }
}
