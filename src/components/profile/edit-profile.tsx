import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload } from "lucide-react";

export default function EditProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      navigate("/profile", { replace: true });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/profile")}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Picture
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
                <CardDescription>
                  Update your profile cover image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="h-48 w-full bg-cover bg-center rounded-md border-2 border-dashed border-muted flex items-center justify-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80)`,
                  }}
                >
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Cover Image
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Alex Morgan" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input id="title" defaultValue="Senior Product Manager" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    rows={5}
                    defaultValue="Product leader with 8+ years of experience in tech. Passionate about building user-centric products that solve real problems. Previously at TechCorp and InnovateLabs."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>
                    Add or edit your work history
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Experience Item 1 */}
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">
                      Senior Product Manager at TechCorp
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title-1">Job Title</Label>
                      <Input
                        id="job-title-1"
                        defaultValue="Senior Product Manager"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-1">Company</Label>
                      <Input id="company-1" defaultValue="TechCorp" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location-1">Location</Label>
                      <Input id="location-1" defaultValue="San Francisco, CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dates-1">Employment Period</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="start-date-1"
                          defaultValue="Jan 2021"
                          placeholder="Start Date"
                        />
                        <span>to</span>
                        <Input
                          id="end-date-1"
                          placeholder="End Date (or 'Present')"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description-1">Description</Label>
                    <Textarea
                      id="description-1"
                      rows={3}
                      defaultValue="Leading product strategy for the company's flagship SaaS platform. Managing a cross-functional team of designers, engineers, and data analysts."
                    />
                  </div>
                </div>

                {/* Experience Item 2 */}
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">
                      Product Manager at InnovateLabs
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-title-2">Job Title</Label>
                      <Input id="job-title-2" defaultValue="Product Manager" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-2">Company</Label>
                      <Input id="company-2" defaultValue="InnovateLabs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location-2">Location</Label>
                      <Input id="location-2" defaultValue="San Francisco, CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dates-2">Employment Period</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="start-date-2"
                          defaultValue="Mar 2018"
                          placeholder="Start Date"
                        />
                        <span>to</span>
                        <Input
                          id="end-date-2"
                          defaultValue="Dec 2020"
                          placeholder="End Date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description-2">Description</Label>
                    <Textarea
                      id="description-2"
                      rows={3}
                      defaultValue="Developed product roadmaps and executed product launches that increased user engagement by 45% and revenue by 30%."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>
                    Add or edit your educational background
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Education Item 1 */}
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">Stanford University</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-1">School</Label>
                      <Input id="school-1" defaultValue="Stanford University" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree-1">Degree</Label>
                      <Input
                        id="degree-1"
                        defaultValue="Master of Business Administration"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field-1">Field of Study</Label>
                      <Input id="field-1" defaultValue="Product Management" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edu-dates-1">Years</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="edu-start-1"
                          defaultValue="2016"
                          placeholder="Start Year"
                        />
                        <span>to</span>
                        <Input
                          id="edu-end-1"
                          defaultValue="2018"
                          placeholder="End Year"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Item 2 */}
                <div className="space-y-4 border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">
                      University of California, Berkeley
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-2">School</Label>
                      <Input
                        id="school-2"
                        defaultValue="University of California, Berkeley"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree-2">Degree</Label>
                      <Input id="degree-2" defaultValue="Bachelor of Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field-2">Field of Study</Label>
                      <Input id="field-2" defaultValue="Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edu-dates-2">Years</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="edu-start-2"
                          defaultValue="2012"
                          placeholder="Start Year"
                        />
                        <span>to</span>
                        <Input
                          id="edu-end-2"
                          defaultValue="2016"
                          placeholder="End Year"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>
                  Add or edit your professional skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Textarea
                    id="skills"
                    rows={3}
                    defaultValue="Product Management, User Research, Agile, Data Analysis, Wireframing, Roadmapping, A/B Testing, Team Leadership"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
