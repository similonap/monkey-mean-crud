import { Routes } from '@angular/router';
import { MonkeyListPage } from "./pages/monkey-list-page/monkey-list-page";
import { MonkeyDetailPage } from "./pages/monkey-detail-page/monkey-detail-page";
import { MonkeyEditPage } from "./pages/monkey-edit-page/monkey-edit-page";
import { MonkeyCreatePage } from "./pages/monkey-create-page/monkey-create-page";
import { SpeciesListPage } from "./pages/species-list-page/species-list-page";
import { SpeciesDetailPage } from "./pages/species-detail-page/species-detail-page";

export const routes: Routes = [
    {
        path: 'monkeys',
        component: MonkeyListPage
    },
    {
        path: '',
        redirectTo: 'monkeys',
        pathMatch: 'full'
    },
    {
        path: 'monkeys/new',
        component: MonkeyCreatePage
    },
    {
        path: 'monkeys/:id/edit',
        component: MonkeyEditPage
    },
    { 
        path: 'monkeys/:id', 
        component: MonkeyDetailPage 
    },
    {
        path: 'species',
        component: SpeciesListPage
    },
    {
        path: 'species/:id',
        component: SpeciesDetailPage
    }
];
