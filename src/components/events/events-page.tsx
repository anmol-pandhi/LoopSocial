import { useState } from "react";
import { MainLayout } from "../layouts/main-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Award,
  Trophy,
  Zap,
  Globe,
  Laptop,
  Clock,
  CalendarDays,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  organizer: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  type: "hackathon" | "competition" | "conference" | "workshop" | "meetup";
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
  description: string;
  image: string;
  attendees: number;
  prizes?: string;
  tags: string[];
  featured?: boolean;
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Stanford Summer Hackathon 2023",
      organizer: {
        name: "Stanford University",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SU",
        verified: true,
      },
      type: "hackathon",
      startDate: "June 15, 2023",
      endDate: "June 17, 2023",
      location: "Stanford, CA",
      isVirtual: false,
      description:
        "Join us for 48 hours of coding, collaboration, and innovation focused on building sustainable technology solutions. Open to all college students.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      attendees: 500,
      prizes: "$50,000 in total prizes",
      tags: ["Sustainability", "Innovation", "College"],
      featured: true,
    },
    {
      id: 2,
      title: "Global AI Challenge",
      organizer: {
        name: "TechCorp",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
        verified: true,
      },
      type: "competition",
      startDate: "July 1, 2023",
      endDate: "August 15, 2023",
      location: "Online",
      isVirtual: true,
      description:
        "A six-week global competition challenging participants to build innovative AI solutions for real-world problems. Open to individuals and teams worldwide.",
      image:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&q=80",
      attendees: 2500,
      prizes: "$100,000 in cash prizes and cloud credits",
      tags: ["Artificial Intelligence", "Machine Learning", "Global"],
      featured: true,
    },
    {
      id: 3,
      title: "TechConnect Conference 2023",
      organizer: {
        name: "TechConnect Network",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TCN",
      },
      type: "conference",
      startDate: "July 8, 2023",
      endDate: "July 10, 2023",
      location: "San Francisco, CA",
      isVirtual: false,
      description:
        "Annual tech conference featuring keynotes from industry leaders, workshops, networking opportunities, and product showcases.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      attendees: 1200,
      tags: ["Networking", "Industry", "Professional Development"],
    },
    {
      id: 4,
      title: "Women in Tech Hackathon",
      organizer: {
        name: "Women in Tech Alliance",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=WIT",
        verified: true,
      },
      type: "hackathon",
      startDate: "August 5, 2023",
      endDate: "August 6, 2023",
      location: "Online",
      isVirtual: true,
      description:
        "A 24-hour virtual hackathon designed to empower women in technology. Build projects, learn new skills, and connect with mentors and peers.",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
      attendees: 750,
      prizes: "$25,000 in prizes and mentorship opportunities",
      tags: ["Women in Tech", "Diversity", "Inclusion"],
      featured: true,
    },
    {
      id: 5,
      title: "Blockchain Innovation Challenge",
      organizer: {
        name: "Crypto Foundation",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CF",
      },
      type: "competition",
      startDate: "August 20, 2023",
      endDate: "September 30, 2023",
      location: "Online",
      isVirtual: true,
      description:
        "A six-week challenge to build innovative blockchain applications across finance, supply chain, healthcare, and more.",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
      attendees: 1800,
      prizes: "$75,000 in crypto and investment opportunities",
      tags: ["Blockchain", "Cryptocurrency", "Web3"],
    },
    {
      id: 6,
      title: "Product Management Workshop",
      organizer: {
        name: "Product School",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
        verified: true,
      },
      type: "workshop",
      startDate: "June 25, 2023",
      endDate: "June 25, 2023",
      location: "New York, NY",
      isVirtual: false,
      description:
        "A full-day intensive workshop on product management best practices, led by senior product leaders from top tech companies.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      attendees: 150,
      tags: ["Product Management", "Professional Development", "Workshop"],
    },
    {
      id: 7,
      title: "College Coding Competition",
      organizer: {
        name: "MIT",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MIT",
        verified: true,
      },
      type: "competition",
      startDate: "September 15, 2023",
      endDate: "September 15, 2023",
      location: "Cambridge, MA",
      isVirtual: false,
      description:
        "A one-day coding competition for college students to solve algorithmic challenges and compete for prizes and recognition.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
      attendees: 300,
      prizes: "$10,000 in scholarships and tech gadgets",
      tags: ["Algorithms", "Competitive Programming", "College"],
    },
    {
      id: 8,
      title: "UX Design Meetup",
      organizer: {
        name: "Design Community",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DC",
      },
      type: "meetup",
      startDate: "July 20, 2023",
      endDate: "July 20, 2023",
      location: "Seattle, WA",
      isVirtual: false,
      description:
        "Monthly meetup for UX designers to share work, get feedback, and network with fellow designers in the Seattle area.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      attendees: 75,
      tags: ["UX Design", "Networking", "Design"],
    },
  ]);

  const filteredEvents = events.filter((event) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.organizer.name.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const featuredEvents = events.filter((event) => event.featured);
  const hackathons = events.filter((event) => event.type === "hackathon");
  const competitions = events.filter((event) => event.type === "competition");
  const conferences = events.filter(
    (event) =>
      event.type === "conference" ||
      event.type === "workshop" ||
      event.type === "meetup",
  );

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Events & Competitions</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Date
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                <TabsTrigger value="competitions">Competitions</TabsTrigger>
                <TabsTrigger value="conferences">
                  Conferences & Workshops
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div
                        className="h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={event.organizer.avatar} />
                                <AvatarFallback>
                                  {event.organizer.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {event.organizer.name}
                              {event.organizer.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Badge
                            className={`
                              ${event.type === "hackathon" ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" : ""}
                              ${event.type === "competition" ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300" : ""}
                              ${event.type === "conference" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : ""}
                              ${event.type === "workshop" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : ""}
                              ${event.type === "meetup" ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300" : ""}
                            `}
                          >
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.startDate}
                              {event.startDate !== event.endDate &&
                                ` - ${event.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                            {event.isVirtual && (
                              <Badge variant="outline" className="ml-2">
                                <Laptop className="h-3 w-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.attendees.toLocaleString()} attendees
                            </span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-3">
                          {event.description}
                        </p>
                        {event.prizes && (
                          <div className="mt-3 flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {event.prizes}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hackathons" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hackathons.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div
                        className="h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={event.organizer.avatar} />
                                <AvatarFallback>
                                  {event.organizer.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {event.organizer.name}
                              {event.organizer.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                            Hackathon
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.startDate}
                              {event.startDate !== event.endDate &&
                                ` - ${event.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                            {event.isVirtual && (
                              <Badge variant="outline" className="ml-2">
                                <Laptop className="h-3 w-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.attendees.toLocaleString()} attendees
                            </span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-3">
                          {event.description}
                        </p>
                        {event.prizes && (
                          <div className="mt-3 flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {event.prizes}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="competitions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {competitions.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div
                        className="h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={event.organizer.avatar} />
                                <AvatarFallback>
                                  {event.organizer.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {event.organizer.name}
                              {event.organizer.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                            Competition
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.startDate}
                              {event.startDate !== event.endDate &&
                                ` - ${event.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                            {event.isVirtual && (
                              <Badge variant="outline" className="ml-2">
                                <Laptop className="h-3 w-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.attendees.toLocaleString()} attendees
                            </span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-3">
                          {event.description}
                        </p>
                        {event.prizes && (
                          <div className="mt-3 flex items-center">
                            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {event.prizes}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="conferences" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conferences.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div
                        className="h-48 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={event.organizer.avatar} />
                                <AvatarFallback>
                                  {event.organizer.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {event.organizer.name}
                              {event.organizer.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Badge
                            className={`
                              ${event.type === "conference" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : ""}
                              ${event.type === "workshop" ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : ""}
                              ${event.type === "meetup" ? "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300" : ""}
                            `}
                          >
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.startDate}
                              {event.startDate !== event.endDate &&
                                ` - ${event.endDate}`}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                            {event.isVirtual && (
                              <Badge variant="outline" className="ml-2">
                                <Laptop className="h-3 w-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {event.attendees.toLocaleString()} attendees
                            </span>
                          </div>
                        </div>
                        <p className="text-sm line-clamp-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Register Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Featured Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                  >
                    <div
                      className="h-16 w-16 rounded-md bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${event.image})` }}
                    />
                    <div>
                      <h4 className="font-medium line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{event.startDate}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <Badge
                        className={`mt-2 text-xs
                          ${event.type === "hackathon" ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" : ""}
                          ${event.type === "competition" ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300" : ""}
                          ${event.type === "conference" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" : ""}
                        `}
                      >
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Featured Events
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Verified Organizers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=SU" />
                    <AvatarFallback>SU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="font-medium truncate">
                        Stanford University
                      </h4>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      3 upcoming events
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=MIT" />
                    <AvatarFallback>MIT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="font-medium truncate">MIT</h4>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      2 upcoming events
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=WIT" />
                    <AvatarFallback>WIT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="font-medium truncate">
                        Women in Tech Alliance
                      </h4>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      1 upcoming event
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Organizers
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer">
                    Hackathon
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Artificial Intelligence
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Sustainability
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    College
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Women in Tech
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Blockchain
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Product Management
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    UX Design
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Networking
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer">
                    Global
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
