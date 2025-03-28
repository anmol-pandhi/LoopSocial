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
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Flame, // Changed from Fire to Flame
  Award,
  Zap,
  Globe,
  Hash,
} from "lucide-react";

interface TrendingPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  group?: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  topics: string[];
  trending?: boolean;
}

interface TrendingTopic {
  id: number;
  name: string;
  postCount: number;
  trending: boolean;
}

export default function TrendingPage() {
  const [trendingPosts] = useState<TrendingPost[]>([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        verified: true,
      },
      group: "Product Management Professionals",
      content:
        "Just published my article on 'The Future of Product Management in AI-driven Companies' - sharing insights from my experience leading product at tech giants and startups alike. #ProductManagement #AI #Leadership",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      timestamp: "3 hours ago",
      likes: 458,
      comments: 72,
      shares: 134,
      topics: ["Product Management", "Artificial Intelligence", "Leadership"],
      trending: true,
    },
    {
      id: 2,
      author: {
        name: "Stanford University",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SU",
        verified: true,
      },
      content:
        "Announcing our Summer Hackathon 2023: 'Building for Sustainability'. Join us for 48 hours of coding, collaboration, and innovation. $50,000 in prizes! Registration now open. #StanfordHackathon #Sustainability #TechForGood",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      timestamp: "5 hours ago",
      likes: 892,
      comments: 156,
      shares: 347,
      topics: ["Hackathon", "Sustainability", "Education"],
      trending: true,
    },
    {
      id: 3,
      author: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      group: "UX Design Community",
      content:
        "I've just released a free UI kit for fintech applications - 120+ components, dark/light mode, and fully responsive. Download link in comments! #UXDesign #UIKit #Fintech",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      timestamp: "7 hours ago",
      likes: 723,
      comments: 94,
      shares: 215,
      topics: ["UX Design", "UI Kit", "Fintech"],
      trending: true,
    },
    {
      id: 4,
      author: {
        name: "TechCrunch",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
        verified: true,
      },
      content:
        "Breaking: Google announces new AI-powered developer tools at DevCon 2023, including code generation and automated testing features. #GoogleDevCon #AI #DeveloperTools",
      timestamp: "12 hours ago",
      likes: 1245,
      comments: 328,
      shares: 576,
      topics: ["Technology News", "Google", "Developer Tools"],
      trending: true,
    },
    {
      id: 5,
      author: {
        name: "Emma Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      },
      group: "Women in Tech",
      content:
        "Excited to announce that our mentorship program for women in STEM has matched over 1,000 mentors and mentees this year! Applications for the next cohort open next month. #WomenInTech #Mentorship #STEM",
      timestamp: "1 day ago",
      likes: 932,
      comments: 87,
      shares: 203,
      topics: ["Women in Tech", "Mentorship", "STEM"],
    },
  ]);

  const [trendingTopics] = useState<TrendingTopic[]>([
    {
      id: 1,
      name: "Artificial Intelligence",
      postCount: 12453,
      trending: true,
    },
    { id: 2, name: "Hackathon", postCount: 8721, trending: true },
    { id: 3, name: "Product Management", postCount: 7654, trending: true },
    { id: 4, name: "UX Design", postCount: 6543, trending: true },
    { id: 5, name: "Web Development", postCount: 5432, trending: false },
    { id: 6, name: "Data Science", postCount: 4321, trending: false },
    { id: 7, name: "Blockchain", postCount: 3210, trending: false },
    { id: 8, name: "Cybersecurity", postCount: 2109, trending: false },
  ]);

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Trending Now</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList>
                <TabsTrigger value="trending">
                  <Flame className="mr-2 h-4 w-4" /> {/* Changed from Fire to Flame */}
                  Trending
                </TabsTrigger>
                <TabsTrigger value="topics">
                  <Hash className="mr-2 h-4 w-4" />
                  Topics
                </TabsTrigger>
                <TabsTrigger value="communities">
                  <Users className="mr-2 h-4 w-4" />
                  Communities
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="mt-6 space-y-4">
                {trendingPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                              {post.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">
                                {post.author.name}
                              </h3>
                              {post.author.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                >
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{post.timestamp}</span>
                              {post.group && (
                                <>
                                  <span className="mx-1">•</span>
                                  <span>in </span>
                                  <Badge
                                    variant="outline"
                                    className="ml-1 text-xs"
                                  >
                                    {post.group}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {post.trending && (
                          <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <div className="rounded-lg overflow-hidden mb-4">
                          <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.topics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-secondary/80"
                          >
                            #{topic.replace(/\s+/g, "")}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-between">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-1 h-4 w-4" />
                          {post.likes.toLocaleString()}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {post.comments.toLocaleString()}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="mr-1 h-4 w-4" />
                          {post.shares.toLocaleString()}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="mr-1 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="topics" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingTopics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Hash className="h-5 w-5 mr-2 text-primary" />
                          {topic.name}
                          {topic.trending && (
                            <Badge className="ml-2 bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {topic.postCount.toLocaleString()} posts
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Follow Topic
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="communities" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="overflow-hidden">
                    <div
                      className="h-32 w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80)`,
                      }}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Product Management Professionals
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        2,547 members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="line-clamp-2">
                        A community for product managers to share insights, best
                        practices, and career advice.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge>Trending</Badge>
                      <Button size="sm">Join Group</Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden">
                    <div
                      className="h-32 w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80)`,
                      }}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Stanford University
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        15,832 members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="line-clamp-2">
                        Official community for Stanford University students,
                        alumni, and faculty.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge>Education</Badge>
                      <Button size="sm">Join Group</Button>
                    </CardFooter>
                  </Card>

                  <Card className="overflow-hidden">
                    <div
                      className="h-32 w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80)`,
                      }}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Women in Tech</CardTitle>
                        <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        8,943 members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="line-clamp-2">
                        A supportive community for women in technology to
                        network, share experiences, and advance their careers.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Badge>Trending</Badge>
                      <Button size="sm">Join Group</Button>
                    </CardFooter>
                  </Card>
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
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                      Hackathon
                    </Badge>
                    <Badge variant="outline">Jun 15-17</Badge>
                  </div>
                  <h3 className="font-medium">Stanford Summer Hackathon</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    48-hour coding competition focused on sustainability
                    solutions
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Register
                  </Button>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      Conference
                    </Badge>
                    <Badge variant="outline">Jul 8-10</Badge>
                  </div>
                  <h3 className="font-medium">TechConnect 2023</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Annual tech conference with industry leaders and networking
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                      Competition
                    </Badge>
                    <Badge variant="outline">Aug 5</Badge>
                  </div>
                  <h3 className="font-medium">AI Challenge 2023</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Global competition to build innovative AI solutions
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Verified Communities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-md bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://api.dicebear.com/7.x/initials/svg?seed=MIT)`,
                    }}
                  />
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
                      12,547 members
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-md bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://api.dicebear.com/7.x/initials/svg?seed=UCB)`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="font-medium truncate">UC Berkeley</h4>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      10,832 members
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-md bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://api.dicebear.com/7.x/initials/svg?seed=CMU)`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="font-medium truncate">Carnegie Mellon</h4>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      9,421 members
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Communities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

