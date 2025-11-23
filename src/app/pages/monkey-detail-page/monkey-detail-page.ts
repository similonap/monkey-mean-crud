import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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

  ngOnInit(): void {
      
  }
}
