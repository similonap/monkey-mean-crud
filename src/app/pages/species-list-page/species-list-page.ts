import { Component, OnInit, inject, signal } from '@angular/core';
import { MonkeyApiService } from '../../services/monkey-api';

@Component({
    selector: 'app-species-list-page',
    imports: [],
    templateUrl: './species-list-page.html',
    styleUrl: './species-list-page.css',
})
export class SpeciesListPage implements OnInit {
    private monkeyApi = inject(MonkeyApiService);

    ngOnInit(): void {
    }
}
