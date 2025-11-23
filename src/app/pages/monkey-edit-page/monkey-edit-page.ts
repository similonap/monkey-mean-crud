import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-monkey-edit-page',
  imports: [],
  templateUrl: './monkey-edit-page.html',
  styleUrl: './monkey-edit-page.css',
})
export class MonkeyEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  ngOnInit(): void {
      
  }
}
