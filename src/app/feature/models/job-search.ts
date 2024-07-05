export interface JobList {
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
}

export interface Job {
    id: number;
    companyName: string;
    title: string;
    companyLogo: string;
    reference: string;
    description: string;
    location: string;
    industries: Array<string>;
    types: Array<string>;
    publishDate: Date;
}