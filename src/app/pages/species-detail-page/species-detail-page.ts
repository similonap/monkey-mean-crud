import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-species-detail-page',
  imports: [],
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
        this.loading.set(false);
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
