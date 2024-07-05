import { Component } from '@angular/core';
import { JobSearchService } from '../services/job-search.service';
import { JobList } from '../models/job-search';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent {
  jobList!: JobList[];
  subscription: Subscription = new Subscription();

  constructor(
    private jobSearchService: JobSearchService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getAllJobs();
  }

  // get all jobs
  getAllJobs() {
    this.subscription = this.jobSearchService.getAllJobs().subscribe((res) => {
      sessionStorage.setItem('jobs', JSON.stringify(res));
      this.jobList = res;
    });
  }

  // get job details
  getJobDetails(job: JobList) {
    sessionStorage.setItem('isFav', 'false');
    this.router.navigate([`/jobs/${job.id}`]);
  }

  // select favourite job
  onFavouriteSelected(job: JobList) {
    const favs = this.getAllFavsIds();
    if (!favs.includes(job.id)) {
      favs.push(job.id)
    } else {
      favs.splice(favs.indexOf(job.id), 1);
    }
    sessionStorage.setItem("favourites", JSON.stringify(favs))
  }

  // get all favourites job ids
  getAllFavsIds() {
    return JSON.parse(sessionStorage.getItem('favourites') ?? "[]") as [number];
  }

  // check if job favourite
  isJobFav(job: JobList) {
    return this.getAllFavsIds().includes(job.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
