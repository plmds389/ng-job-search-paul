import { Component } from '@angular/core';
import { Job } from '../models/job-search';
import { JobSearchService } from '../services/job-search.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  jobDetails!: Job;
  jobId!: number;
  subscriptions: Subscription[] = [];
  isFav!: boolean;

  constructor(
    public jobSearchService: JobSearchService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.isFav = JSON.parse(sessionStorage.getItem('isFav') ?? "false");
    const paramsSubscription = this.route.params.subscribe(params => {
      this.jobId = params['id'];
    });
    this.getJobDetails();
    this.subscriptions.push(paramsSubscription);
  }

  // get job details
  getJobDetails() {
    const jobDetailsSubscription = this.jobSearchService.getJobDetails(this.jobId).subscribe((res) => {
      this.jobDetails = res;
      this.subscriptions.push(jobDetailsSubscription);
    }, (error) => {
      this.router.navigate(['/jobs']);
    });
  }

  // on back click
  onBack() {
    this.isFav ? this.router.navigate(['/favourites']) : this.router.navigate(['/jobs']);
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
