import { useState, useEffect } from "react";
import { MainLayout } from "../layouts/main-layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Plus,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react";

import { Group, Post } from "@/types/group";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import {
  getGroups,
  getJoinedGroups,
  getGroupPosts,
  joinGroup,
  leaveGroup,
} from "@/lib/groups";

export default function GroupsPage() {
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        // Get current user
        const { data } = await supabase.auth.getSession();
        const userId = data.session?.user?.id;
        setCurrentUserId(userId || null);

        // Fetch groups and posts
        const [allGroupsData, joinedGroupsData, postsData] = await Promise.all([
          getGroups(),
          userId ? getJoinedGroups(userId) : Promise.resolve([]),
          getGroupPosts(),
        ]);

        // Mark joined groups
        const joinedGroupIds = joinedGroupsData.map((g) => g.id);
        const allGroupsWithJoinedStatus = allGroupsData.map((group) => ({
          ...group,
          joined: joinedGroupIds.includes(group.id),
        }));

        setAllGroups(allGroupsWithJoinedStatus);
        setMyGroups(allGroupsWithJoinedStatus.filter((g) => g.joined));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error loading data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [toast]);

  const handleJoinGroup = async (groupId: number) => {
    if (!currentUserId) {
      toast({
        title: "Authentication required",
        description: "Please log in to join groups",
        variant: "destructive",
      });
      return;
    }

    try {
      const group = allGroups.find((g) => g.id === groupId);
      if (!group) return;

      if (group.joined) {
        // Leave group
        await leaveGroup(currentUserId, groupId);
        toast({
          title: "Left group",
          description: `You have left ${group.name}`,
        });
      } else {
        // Join group
        await joinGroup(currentUserId, groupId);
        toast({
          title: "Joined group",
          description: `You have joined ${group.name}`,
        });
      }

      // Update UI
      setAllGroups(
        allGroups.map((group) => {
          if (group.id === groupId) {
            const updatedGroup = { ...group, joined: !group.joined };
            return updatedGroup;
          }
          return group;
        }),
      );

      // Update myGroups
      setMyGroups(
        allGroups
          .map((group) => {
            if (group.id === groupId) {
              return { ...group, joined: !group.joined };
            }
            return group;
          })
          .filter((group) => group.joined),
      );
    } catch (error) {
      console.error("Error joining/leaving group:", error);
      toast({
        title: "Error",
        description: "Failed to update group membership",
        variant: "destructive",
      });
    }
  };

  const handleLikePost = async (postId: number) => {
    if (!currentUserId) {
      toast({
        title: "Authentication required",
        description: "Please log in to like posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

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

      // Update in database
      if (!post.liked) {
        // Like post
        await supabase
          .from("post_likes")
          .insert([{ user_id: currentUserId, post_id: postId }]);
      } else {
        // Unlike post
        await supabase
          .from("post_likes")
          .delete()
          .eq("user_id", currentUserId)
          .eq("post_id", postId);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes: post.liked ? post.likes + 1 : post.likes - 1,
              liked: !post.liked,
            };
          }
          return post;
        }),
      );

      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  // Filter groups based on search query
  const filteredGroups = allGroups.filter((group) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      group.name.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query) ||
      group.category.toLowerCase().includes(query)
    );
  });

  return (
    <MainLayout>
      <div className="container py-4 sm:py-6 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                Communities & Groups
              </h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>

            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger
                  value="feed"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Group Feed
                </TabsTrigger>
                <TabsTrigger
                  value="my-groups"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  My Groups
                </TabsTrigger>
                <TabsTrigger
                  value="discover"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Discover Groups
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6 space-y-4">
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
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>Posted in </span>
                            <Badge variant="outline" className="ml-1 mr-1">
                              {post.group}
                            </Badge>
                            <span>{post.timestamp}</span>
                          </div>
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

              <TabsContent value="my-groups" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {myGroups.map((group) => (
                    <Card key={group.id} className="overflow-hidden">
                      <div
                        className="h-32 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${group.image})` }}
                      />
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {group.members.toLocaleString()} members
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="line-clamp-2">{group.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Badge>{group.category}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          View Group
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                {myGroups.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">
                      No groups joined yet
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Discover and join groups to connect with like-minded
                      professionals
                    </p>
                    <Button className="mt-4" variant="outline">
                      Discover Groups
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="discover" className="mt-6">
                <div className="mb-6">
                  <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search for groups..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredGroups
                    .filter((group) => !group.joined)
                    .map((group) => (
                      <Card key={group.id} className="overflow-hidden">
                        <div
                          className="h-32 w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${group.image})` }}
                        />
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {group.name}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {group.members.toLocaleString()} members
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p className="line-clamp-2">{group.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Badge>{group.category}</Badge>
                          <Button
                            size="sm"
                            onClick={() => handleJoinGroup(group.id)}
                          >
                            {group.joined ? "View Group" : "Join Group"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-4 sm:space-y-6 mt-4 lg:mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Popular Groups</CardTitle>
                <CardDescription>
                  Trending communities to explore
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allGroups.slice(0, 3).map((group) => (
                  <div key={group.id} className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url(${group.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{group.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {group.members.toLocaleString()} members
                      </p>
                    </div>
                    <Button
                      variant={group.joined ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {group.joined ? "Joined" : "Join"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Group Categories</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Product Management
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Design
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Engineering
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Marketing
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Data Science
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Entrepreneurship
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Leadership
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                >
                  Career Development
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
