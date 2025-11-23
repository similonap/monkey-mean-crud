import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';
import { MonkeyList } from "../../components/monkey-list/monkey-list";

@Component({
  selector: 'app-species-detail-page',
  imports: [MonkeyList],
  templateUrl: './species-detail-page.html',
  styleUrl: './species-detail-page.css',
})
export class SpeciesDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  species = signal<Species | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('No species id provided.');
      this.loading.set(false);
      return;
    }

    this.monkeyApi.getSpeciesById(+id).subscribe({
      next: (data: Species) => {
        this.species.set(data);

        this.monkeyApi.getMonkeysBySpeciesId(data.id).subscribe({
          next: (monkeys) => {
            this.species.update(s => s ? { ...s, monkeys } : s);
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Error loading monkeys for species:', err);
          }
        });

      },
      error: (err) => {
        console.error('Error loading species details', err);
        this.error.set('Failed to load species details.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/species']);
  }
}
