import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Monkey, Species, UpdateMonkeyPayload } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';
import { MonkeyFormComponent, MonkeyFormValue } from '../../components/monkey-form/monkey-form.component';

@Component({
  selector: 'app-monkey-edit-page',
  imports: [MonkeyFormComponent],
  templateUrl: './monkey-edit-page.html',
  styleUrl: './monkey-edit-page.css',
})
export class MonkeyEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  monkeyId: number | null = null;
  speciesList = signal<Species[]>([]);
  monkey = signal<Monkey | null>(null);
  loading = signal<boolean>(true);
  saving = signal<boolean>(false);
  error = signal<string | null>(null);

  readonly detailLink = computed(() =>
    this.monkeyId ? ['/monkeys', this.monkeyId] : ['/monkeys']
  );

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
        this.monkey.set(monkey);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load edit data', err);
        this.error.set('Unable to load monkey information.');
        this.loading.set(false);
      },
    });
  }

  handleSubmit(value: MonkeyFormValue): void {
    if (!this.monkeyId) {
      return;
    }

    this.saving.set(true);
    const payload = this.buildPayload(value);

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

  private buildPayload(formValue: MonkeyFormValue): UpdateMonkeyPayload {
    return {
      name: formValue.name,
      country: formValue.country,
      gender: formValue.gender,
      description: formValue.description,
      image: formValue.image,
      personality_trait: formValue.personality_trait,
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
