import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Monkey } from "../../models/monkey.model";
import { MonkeyApiService } from "../../services/monkey-api";

@Component({
  selector: 'app-monkey-detail-page',
  imports: [],
  templateUrl: './monkey-detail-page.html',
  styleUrl: './monkey-detail-page.css',
})
export class MonkeyDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  monkey = signal<Monkey | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.monkeyApi.getMonkeyById(+id).subscribe({
        next: (data: Monkey) => {
          this.monkey.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load monkey details');
          this.loading.set(false);
          console.error('Error loading monkey:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/monkeys']);
  }

  deleteMonkey(): void {
    const monkey = this.monkey();
    if (monkey) {
      this.monkeyApi.deletedMonkey(monkey.id).subscribe({
        next: () => {
          this.router.navigate(['/monkeys']);
        },
        error: (err) => {
          this.error.set('Failed to delete monkey');
        }
      });
    }
  }
}
