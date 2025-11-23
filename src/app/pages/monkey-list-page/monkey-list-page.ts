import { Component, effect, inject, signal } from '@angular/core';
import { MonkeyApiService } from "../../services/monkey-api";
import { ApiSortOrder, EntityQueryParams, Monkey } from "../../models/monkey.model";
import { FormsModule } from "@angular/forms";
import { NgClass, TitleCasePipe } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MonkeyList, MonkeyTableColumn } from "../../components/monkey-list/monkey-list";

@Component({
  selector: 'app-monkey-list-page',
  imports: [FormsModule, RouterLink, MonkeyList],
  templateUrl: './monkey-list-page.html',
  styleUrl: './monkey-list-page.css',
})
export class MonkeyListPage {

    monkeyApi: MonkeyApiService = inject(MonkeyApiService);
    q = signal<string>('');
    sortDirection = signal<ApiSortOrder>('asc');
    sortField = signal<string>('id');

    router = inject(Router);
    route = inject(ActivatedRoute);
    
    monkeys = signal<Monkey[]>([]);

    tableColumns : MonkeyTableColumn[] = [
        { key: 'image_url', label: '' },
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'species.name', label: 'Species' },
        { key: 'country', label: 'Country', sortable: true },
        { key: 'gender', label: 'Gender', sortable: true },
        { key: 'weight', label: 'Weight (kg)', sortable: true },
        { key: 'height', label: 'Height (cm)', sortable: true },
        { key: 'year', label: 'Year', sortable: true },
        { key: 'likes', label: 'Likes', sortable: true },
        { key: 'personality_trait', label: 'Personality', sortable: true }
    ]

    constructor() {
        this.route.queryParams.subscribe(params => {
            const q = params['q'] || '';
            const sortField = params['sortField'] || 'id';
            const sortOrder = params['sortOrder'] || 'asc';

            this.q.set(q);
            this.sortField.set(sortField);
            this.sortDirection.set(sortOrder);
        });

        effect(() => {
            const params : EntityQueryParams = {
                q: this.q(),
                sortField: this.sortField(),
                sortOrder: this.sortDirection()
            };

            this.monkeyApi.getMonkeys(params).subscribe((data: Monkey[]) => {
                this.monkeys.set(data);
            });

            // update the query params of the current URL without reloading the page
            this.router.navigate(['/monkeys'], { queryParams: { q: this.q(), sortField: this.sortField(), sortOrder: this.sortDirection() }});
        });
    }

    sortChange(column: MonkeyTableColumn): void {
        if (this.sortField() === column.key) {
            const newDirection = this.sortDirection() === 'asc' ? 'desc' : 'asc';
            this.sortDirection.set(newDirection);
            return;
        }
        this.sortField.set(column.key);
    }

    
}
