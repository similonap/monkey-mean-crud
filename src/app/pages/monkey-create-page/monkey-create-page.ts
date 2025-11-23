import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MonkeyFormComponent, MonkeyFormValue } from '../../components/monkey-form/monkey-form.component';
import { CreateMonkeyPayload, Monkey, Species } from '../../models/monkey.model';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
  selector: 'app-monkey-create-page',
  imports: [],
  templateUrl: './monkey-create-page.html',
  styleUrl: './monkey-create-page.css',
})
export class MonkeyCreatePage implements OnInit {
  private router = inject(Router);
  private monkeyApi = inject(MonkeyApiService);

  ngOnInit(): void {
      
  }
}
