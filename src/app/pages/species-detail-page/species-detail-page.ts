import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  ngOnInit(): void {
      
  }
}
