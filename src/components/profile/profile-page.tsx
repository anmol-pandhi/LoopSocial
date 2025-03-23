import { useState } from "react";
import { MainLayout } from "../layouts/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface ProfileData {
  name: string;
  title: string;
  location: string;
  about: string;
  avatar: string;
  coverImage: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  connections: number;
}

const profileData: ProfileData = {
  name: "Alex Morgan",
  title: "Senior Product Manager",
  location: "San Francisco, CA",
  about:
    "Product leader with 8+ years of experience in tech. Passionate about building user-centric products that solve real problems. Previously at TechCorp and InnovateLabs.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  coverImage:
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  skills: [
    "Product Management",
    "User Research",
    "Agile",
    "Data Analysis",
    "Wireframing",
    "Roadmapping",
    "A/B Testing",
    "Team Leadership",
  ],
  experiences: [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "TechCorp",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: null,
      description:
        "Leading product strategy for the company's flagship SaaS platform. Managing a cross-functional team of designers, engineers, and data analysts.",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      location: "San Francisco, CA",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description:
        "Developed product roadmaps and executed product launches that increased user engagement by 45% and revenue by 30%.",
    },
  ],
  education: [
    {
      id: 1,
      school: "Stanford University",
      degree: "Master of Business Administration",
      field: "Product Management",
      startDate: "2016",
      endDate: "2018",
    },
    {
      id: 2,
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012",
      endDate: "2016",
    },
  ],
  connections: 487,
};

export default function ProfilePage() {
  const [profile] = useState<ProfileData>(profileData);

  return (
    <MainLayout>
      <div className="container max-w-5xl py-6 space-y-6">
        {/* Cover and Profile Info */}
        <Card className="border overflow-hidden">
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profile.coverImage})` }}
          />
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 gap-4 md:gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-muted-foreground">{profile.title}</p>
                  </div>
                  <Link to="/profile/edit">
                    <Button size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">{profile.connections}</span>{" "}
                  connections
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="about"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{profile.about}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <Briefcase className="mr-1 h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {exp.startDate} - {exp.endDate || "Present"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{exp.description}</p>
                    {exp.id !== profile.experiences.length && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{edu.school}</h3>
                        <div className="flex items-center text-muted-foreground">
                          <GraduationCap className="mr-1 h-4 w-4" />
                          <span>
                            {edu.degree}, {edu.field}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    {edu.id !== profile.education.length && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
