import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobList } from '../models/job-search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  constructor(
    private http: HttpClient
  ) {}

  getAllJobs() {
    return this.http.get<JobList[]>("/jobs")
  }

  // get job details
  getJobDetails(jobId: number): Observable<Job> {
    return this.http.get<Job>(`/jobs/${jobId}`);
  }
}
