import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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

  ngOnInit(): void {
      
  }
}
