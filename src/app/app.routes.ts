import { Routes } from '@angular/router';
import { MonkeyListPage } from "./pages/monkey-list-page/monkey-list-page";
import { MonkeyDetailPage } from "./pages/monkey-detail-page/monkey-detail-page";
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
