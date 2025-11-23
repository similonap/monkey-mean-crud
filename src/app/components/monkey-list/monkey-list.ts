import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiSortOrder, Monkey } from "../../models/monkey.model";
import { TitleCasePipe } from "@angular/common";
import { RouterLink } from "@angular/router";


export interface MonkeyTableColumn {
    key: string;
    label: string;
    sortable?: boolean;
}

@Component({
    selector: 'app-monkey-list',
    imports: [TitleCasePipe, RouterLink],
    templateUrl: './monkey-list.html',
    styleUrl: './monkey-list.css',
})
export class MonkeyList {
    @Output() onSort = new EventEmitter<MonkeyTableColumn>();
    @Input() monkeys: Monkey[] = [];
    @Input() sortField: string = '';
    @Input() sortDirection: ApiSortOrder = 'asc';
    @Input() tableColumns: MonkeyTableColumn[] = [
        { key: 'image_url', label: '' },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'name', label: 'Name', sortable: false },
        { key: 'species.name', label: 'Species' },
        { key: 'country', label: 'Country', sortable: false },
        { key: 'gender', label: 'Gender', sortable: false },
        { key: 'weight', label: 'Weight (kg)', sortable: false },
        { key: 'height', label: 'Height (cm)', sortable: false },
        { key: 'year', label: 'Year', sortable: false },
        { key: 'likes', label: 'Likes', sortable: false },
        { key: 'personality_trait', label: 'Personality', sortable: false }
    ]


    handleSort(columnKey: MonkeyTableColumn): void {
        this.onSort.emit(columnKey);
    }
}
