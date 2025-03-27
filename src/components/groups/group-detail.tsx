import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Calendar,
  Info,
  Settings,
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Link as LinkIcon,
  Smile,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Group, Post } from "@/types/group";

export default function GroupDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [isPostingLoading, setIsPostingLoading] = useState(false);
  const { toast } = useToast();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGroupData() {
      if (!groupId) return;

      try {
        setIsLoading(true);

        // Get current user
        const { data } = await supabase.auth.getSession();
        setCurrentUserId(data.session?.user?.id || null);

        // For demo purposes, we'll use mock data
        // In a real app, you would fetch from Supabase
        const mockGroup: Group = {
          id: parseInt(groupId),
          name: "Product Management Professionals",
          description:
            "A community for product managers to share insights, discuss strategies, and network with peers across industries.",
          category: "Product Management",
          members: 2458,
          posts: 127,
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
          joined: true,
        };

        const mockPosts: Post[] = [
          {
            id: 1,
            author: {
              name: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            },
            group: "Product Management Professionals",
            content:
              "Just finished reading 'Inspired' by Marty Cagan. Highly recommend for all PMs looking to build better products. What product books have influenced your approach?",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            shares: 3,
            liked: false,
          },
          {
            id: 2,
            author: {
              name: "Michael Chen",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            },
            group: "Product Management Professionals",
            content:
              "Hosting a virtual workshop next week on user story mapping techniques. Drop a comment if you're interested and I'll share the registration link!",
            timestamp: "5 hours ago",
            likes: 18,
            comments: 12,
            shares: 5,
            liked: true,
          },
          {
            id: 3,
            author: {
              name: "Priya Patel",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
            },
            group: "Product Management Professionals",
            content:
              "What metrics do you use to measure product success? Beyond the obvious revenue and user growth, I'm curious about the more nuanced indicators you track.",
            timestamp: "1 day ago",
            likes: 32,
            comments: 15,
            shares: 7,
            liked: false,
          },
        ];

        const mockMembers = [
          {
            id: 1,
            name: "Sarah Johnson",
            role: "Senior PM at Spotify",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "Product Lead at Adobe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          },
          {
            id: 3,
            name: "Priya Patel",
            role: "PM at Airbnb",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
          },
          {
            id: 4,
            name: "David Wilson",
            role: "Director of Product at Slack",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
          },
          {
            id: 5,
            name: "Emma Rodriguez",
            role: "Product Manager at Netflix",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
          },
        ];

        setGroup(mockGroup);
        setPosts(mockPosts);
        setMembers(mockMembers);
      } catch (error) {
        console.error("Error fetching group data:", error);
        toast({
          title: "Error loading group",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchGroupData();
  }, [groupId, toast]);

  const handleLikePost = (postId: number) => {
    if (!currentUserId) {
      toast({
        title: "Authentication required",
        description: "Please log in to like posts",
        variant: "destructive",
      });
      return;
    }

    // Optimistically update UI
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      }),
    );

    // In a real app, you would update the database here
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    if (!currentUserId) {
      toast({
        title: "Authentication required",
        description: "Please log in to post",
        variant: "destructive",
      });
      return;
    }

    setIsPostingLoading(true);

    // Create a new post (in a real app, you would save to the database)
    const newPost: Post = {
      id: Date.now(), // Use a timestamp as a temporary ID
      author: {
        name: "You", // In a real app, get the user's name
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
      group: group?.name || "",
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };

    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsPostingLoading(false);

    toast({
      title: "Post created",
      description: "Your post has been published to the group",
    });
  };

  const handleGoBack = () => {
    navigate("/groups");
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading group...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!group) {
    return (
      <MainLayout>
        <div className="container py-8 px-4">
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-xl font-bold mb-2">Group not found</h2>
            <p className="text-muted-foreground mb-4">
              The group you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleGoBack}>Back to Groups</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-4 sm:py-6 px-4 sm:px-6">
        {/* Group Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Groups
          </Button>

          <div className="relative rounded-xl overflow-hidden">
            <div
              className="h-48 sm:h-64 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${group.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {group.name}
              </h1>
              <div className="flex items-center mt-2 text-white/90">
                <Users className="h-4 w-4 mr-1" />
                <span>{group.members.toLocaleString()} members</span>
                <span className="mx-2">•</span>
                <Badge>{group.category}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="files"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Files
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6 space-y-4">
                {/* Create Post Card */}
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleCreatePost}>
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Share something with the group..."
                            className="min-h-24 resize-none"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                          />
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex gap-2">
                              <Button type="button" size="sm" variant="outline">
                                <ImageIcon className="h-4 w-4 mr-1" />
                                Photo
                              </Button>
                              <Button type="button" size="sm" variant="outline">
                                <LinkIcon className="h-4 w-4 mr-1" />
                                Link
                              </Button>
                              <Button type="button" size="sm" variant="outline">
                                <Smile className="h-4 w-4 mr-1" />
                                Emoji
                              </Button>
                            </div>
                            <Button
                              type="submit"
                              disabled={
                                isPostingLoading || !newPostContent.trim()
                              }
                            >
                              {isPostingLoading ? "Posting..." : "Post"}
                              <Send className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id} className="border shadow-sm">
                    <CardHeader className="pb-3">
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {post.timestamp}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            post.liked
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }
                          onClick={() => handleLikePost(post.id)}
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <Share2 className="mr-1 h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>
                      Events organized by this group
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 border rounded-lg p-4">
                        <div className="bg-primary/10 text-primary rounded-md p-3 flex flex-col items-center justify-center">
                          <Calendar className="h-5 w-5" />
                          <span className="text-sm font-medium mt-1">
                            May 15
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Product Management Workshop
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Virtual • 2:00 PM - 4:00 PM
                          </p>
                          <p className="text-sm mt-2">
                            Learn advanced techniques for product discovery and
                            validation.
                          </p>
                          <div className="mt-3">
                            <Button size="sm">RSVP</Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 border rounded-lg p-4">
                        <div className="bg-primary/10 text-primary rounded-md p-3 flex flex-col items-center justify-center">
                          <Calendar className="h-5 w-5" />
                          <span className="text-sm font-medium mt-1">
                            May 22
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Q&A with Industry Leaders
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            In Person • San Francisco • 6:00 PM
                          </p>
                          <p className="text-sm mt-2">
                            Join us for a panel discussion with product leaders
                            from top tech companies.
                          </p>
                          <div className="mt-3">
                            <Button size="sm">RSVP</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Files</CardTitle>
                    <CardDescription>
                      Resources shared with the group
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                            <svg
                              className="h-6 w-6 text-blue-600 dark:text-blue-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Product Roadmap Template.pdf
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Shared by Sarah Johnson • 2 days ago
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                            <svg
                              className="h-6 w-6 text-green-600 dark:text-green-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              User Research Analysis.xlsx
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Shared by Michael Chen • 1 week ago
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                            <svg
                              className="h-6 w-6 text-purple-600 dark:text-purple-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Product Management Resources.zip
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Shared by Priya Patel • 2 weeks ago
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Group</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Info className="h-4 w-4 mr-2" />
                        Description
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {group.description}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Moderators
                      </h3>
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
                            <AvatarFallback>DW</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">David Wilson</h4>
                            <p className="text-xs text-muted-foreground">
                              Director of Product at Slack
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">Sarah Johnson</h4>
                            <p className="text-xs text-muted-foreground">
                              Senior PM at Spotify
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Group Rules
                      </h3>
                      <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                        <li>
                          Be respectful and professional in all interactions
                        </li>
                        <li>No self-promotion or spam</li>
                        <li>Keep discussions relevant to product management</li>
                        <li>
                          Respect confidentiality and intellectual property
                        </li>
                        <li>Share knowledge and help others grow</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>
                  Active members in this community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.slice(0, 5).map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{member.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.role}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Connect
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  View All Members
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Similar Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 rounded-md bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&q=80)`,
                    }}
                  />
                  <div>
                    <h4 className="font-medium">UX Design Community</h4>
                    <p className="text-xs text-muted-foreground">
                      1,845 members
                    </p>
                    <Button size="sm" className="mt-1">
                      Join
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 rounded-md bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&q=80)`,
                    }}
                  />
                  <div>
                    <h4 className="font-medium">Tech Leadership Forum</h4>
                    <p className="text-xs text-muted-foreground">
                      2,312 members
                    </p>
                    <Button size="sm" className="mt-1">
                      Join
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="h-12 w-12 rounded-md bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80)`,
                    }}
                  />
                  <div>
                    <h4 className="font-medium">Startup Founders</h4>
                    <p className="text-xs text-muted-foreground">
                      3,127 members
                    </p>
                    <Button size="sm" className="mt-1">
                      Join
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
