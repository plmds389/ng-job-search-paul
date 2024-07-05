import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobList } from '../models/job-search';

@Component({
  selector: 'app-favourite-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite-jobs.component.html',
  styleUrl: './favourite-jobs.component.css'
})
export class FavouriteJobsComponent {
  jobList!: JobList[];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.getAllJobs()
  }

  // get all jobs
  getAllJobs() {
    this.jobList = JSON.parse(sessionStorage.getItem('jobs') ?? "[]");
  }

  // checking if any job is favourite
  isAnyJobFavourite(): boolean {
    return JSON.parse(sessionStorage.getItem('favourites') ?? "[]").length > 0;
  }

  // get job details
  getJobDetails(job: JobList) {
    sessionStorage.setItem('isFav', 'true');
    this.router.navigate([`/jobs/${job.id}`]);
  }

  // check if job favorite
  isJobFav(job: JobList) {
    return JSON.parse(sessionStorage.getItem('favourites') ?? "[]").includes(job.id);
  }
}
