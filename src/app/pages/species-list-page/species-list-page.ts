import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-species-list-page',
  imports: [RouterLink],
  templateUrl: './species-list-page.html',
  styleUrl: './species-list-page.css',
})
export class SpeciesListPage implements OnInit {
  private monkeyApi = inject(MonkeyApiService);

  speciesList = signal<Species[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.monkeyApi.getSpecies().subscribe({
      next: (data: Species[]) => {
        this.speciesList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching species', err);
        this.error.set('Unable to load species right now.');
        this.loading.set(false);
      }
    });
  }
}
