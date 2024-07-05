import { Routes } from '@angular/router';
import { JobListComponent } from './feature/job-list/job-list.component';
import { FavouriteJobsComponent } from './feature/favourite-jobs/favourite-jobs.component';
import { JobDetailsComponent } from './feature/job-details/job-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: "jobs", component: JobListComponent },
    { path: "favourites", component: FavouriteJobsComponent },
    { path: 'jobs/:id', component: JobDetailsComponent },
    { path: "**", redirectTo: "jobs" }
];
