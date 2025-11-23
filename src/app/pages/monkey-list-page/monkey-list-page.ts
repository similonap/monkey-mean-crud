import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-monkey-list-page',
  imports: [FormsModule],
  templateUrl: './monkey-list-page.html',
  styleUrl: './monkey-list-page.css',
})
export class MonkeyListPage {

    router = inject(Router);
    route = inject(ActivatedRoute);
  
}
