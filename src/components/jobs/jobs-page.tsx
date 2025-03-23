import { useState } from "react";
import { MainLayout } from "../layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  MapPin,
  Building,
  Calendar,
  Briefcase,
  Plus,
  BookmarkIcon,
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: {
    name: string;
    logo: string;
  };
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  saved: boolean;
  applied: boolean;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: {
      name: "TechCorp",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    },
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    postedDate: "2 days ago",
    description:
      "We're looking for an experienced Product Manager to lead our flagship SaaS product. You'll work with cross-functional teams to define product strategy, roadmap, and features that deliver exceptional user experiences.",
    requirements: [
      "5+ years of product management experience",
      "Experience with B2B SaaS products",
      "Strong analytical and problem-solving skills",
      "Excellent communication and stakeholder management",
      "Technical background preferred",
    ],
    saved: true,
    applied: false,
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: {
      name: "DesignStudio",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=DS",
    },
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    postedDate: "1 week ago",
    description:
      "Join our creative team to design intuitive and beautiful user experiences for our clients. You'll collaborate with product managers, developers, and stakeholders to create wireframes, prototypes, and high-fidelity designs.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, or similar tools",
      "Strong portfolio demonstrating user-centered design",
      "Experience with design systems",
      "Knowledge of accessibility standards",
    ],
    saved: false,
    applied: true,
  },
  {
    id: 3,
    title: "Senior Frontend Developer",
    company: {
      name: "WebTech",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=WT",
    },
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "3 days ago",
    description:
      "We're seeking a talented Frontend Developer to build responsive and performant web applications. You'll work with modern frameworks and collaborate with designers and backend developers to deliver exceptional user interfaces.",
    requirements: [
      "4+ years of frontend development experience",
      "Proficiency in React, Vue, or Angular",
      "Strong JavaScript, HTML, and CSS skills",
      "Experience with state management and API integration",
      "Knowledge of performance optimization techniques",
    ],
    saved: false,
    applied: false,
  },
  {
    id: 4,
    title: "Data Scientist",
    company: {
      name: "DataCorp",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=DC",
    },
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    postedDate: "5 days ago",
    description:
      "Join our data science team to develop machine learning models and analyze complex datasets. You'll work on challenging problems and deliver insights that drive business decisions.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "3+ years of experience in data science or machine learning",
      "Proficiency in Python, R, or similar languages",
      "Experience with ML frameworks like TensorFlow or PyTorch",
      "Strong statistical analysis skills",
    ],
    saved: true,
    applied: false,
  },
  {
    id: 5,
    title: "Product Marketing Manager",
    company: {
      name: "MarketBoost",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=MB",
    },
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    postedDate: "1 week ago",
    description:
      "We're looking for a Product Marketing Manager to develop and execute marketing strategies for our products. You'll work closely with product, sales, and marketing teams to position our products effectively in the market.",
    requirements: [
      "4+ years of product marketing experience",
      "Experience in B2B SaaS marketing",
      "Strong communication and storytelling skills",
      "Experience with market research and competitive analysis",
      "Ability to translate technical features into customer benefits",
    ],
    saved: false,
    applied: false,
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: {
      name: "CloudSystems",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CS",
    },
    location: "Remote",
    type: "Contract",
    salary: "$100,000 - $130,000",
    postedDate: "4 days ago",
    description:
      "Join our infrastructure team to build and maintain our cloud-based systems. You'll work with modern DevOps tools and practices to ensure reliability, scalability, and security of our platforms.",
    requirements: [
      "3+ years of DevOps or SRE experience",
      "Experience with AWS, Azure, or GCP",
      "Proficiency with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of containerization and orchestration (Docker, Kubernetes)",
      "Experience with CI/CD pipelines",
    ],
    saved: false,
    applied: false,
  },
];

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveJob = (jobId: number) => {
    setAllJobs(
      allJobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, saved: !job.saved };
        }
        return job;
      }),
    );

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({ ...selectedJob, saved: !selectedJob.saved });
    }
  };

  const handleApplyJob = (jobId: number) => {
    setAllJobs(
      allJobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, applied: true };
        }
        return job;
      }),
    );

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({ ...selectedJob, applied: true });
    }
  };

  const filteredJobs = allJobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  });

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Job Board</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Job Listings */}
          <div className="w-full lg:w-2/5 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="pb-3 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="sf">San Francisco</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-3">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${selectedJob?.id === job.id ? "border-primary" : ""}`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                          <img
                            src={job.company.logo}
                            alt={job.company.name}
                            className="h-full w-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {job.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="h-3 w-3 mr-1" />
                            <span className="truncate">{job.company.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end text-xs">
                          <Badge variant="outline">{job.type}</Badge>
                          <span className="text-muted-foreground mt-1">
                            {job.postedDate}
                          </span>
                          {job.saved && (
                            <BookmarkIcon className="h-3 w-3 mt-1 text-primary" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredJobs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No jobs found matching your search criteria.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-4 space-y-3">
                {filteredJobs
                  .filter((job) => job.saved)
                  .map((job) => (
                    <Card
                      key={job.id}
                      className={`cursor-pointer hover:border-primary transition-colors ${selectedJob?.id === job.id ? "border-primary" : ""}`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            <img
                              src={job.company.logo}
                              alt={job.company.name}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-3 w-3 mr-1" />
                              <span className="truncate">
                                {job.company.name}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-xs">
                            <Badge variant="outline">{job.type}</Badge>
                            <span className="text-muted-foreground mt-1">
                              {job.postedDate}
                            </span>
                            <BookmarkIcon className="h-3 w-3 mt-1 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {filteredJobs.filter((job) => job.saved).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No saved jobs found.
                  </div>
                )}
              </TabsContent>

              <TabsContent value="applied" className="mt-4 space-y-3">
                {filteredJobs
                  .filter((job) => job.applied)
                  .map((job) => (
                    <Card
                      key={job.id}
                      className={`cursor-pointer hover:border-primary transition-colors ${selectedJob?.id === job.id ? "border-primary" : ""}`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                            <img
                              src={job.company.logo}
                              alt={job.company.name}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-3 w-3 mr-1" />
                              <span className="truncate">
                                {job.company.name}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{job.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-xs">
                            <Badge variant="outline">{job.type}</Badge>
                            <span className="text-muted-foreground mt-1">
                              {job.postedDate}
                            </span>
                            <Badge variant="secondary" className="mt-1">
                              Applied
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {filteredJobs.filter((job) => job.applied).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No applied jobs found.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Job Details */}
          <div className="w-full lg:w-3/5">
            {selectedJob ? (
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={selectedJob.company.logo}
                        alt={selectedJob.company.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div>
                      <CardTitle>{selectedJob.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {selectedJob.company.name}
                      </CardDescription>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{selectedJob.type}</Badge>
                        <Badge variant="secondary">{selectedJob.salary}</Badge>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {selectedJob.postedDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Job Description
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleSaveJob(selectedJob.id)}
                    >
                      <BookmarkIcon
                        className={`h-4 w-4 ${selectedJob.saved ? "text-primary fill-primary" : ""}`}
                      />
                      {selectedJob.saved ? "Saved" : "Save Job"}
                    </Button>
                    <Button
                      onClick={() => handleApplyJob(selectedJob.id)}
                      disabled={selectedJob.applied}
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      {selectedJob.applied ? "Applied" : "Apply Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center border rounded-lg p-8">
                <p className="text-muted-foreground">
                  Select a job to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
