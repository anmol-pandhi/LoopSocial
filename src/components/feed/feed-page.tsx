import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Heart, Share2, Image, Video } from "lucide-react";
import { MainLayout } from "../layouts/main-layout";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      role: "Product Manager at TechCorp",
    },
    content:
      "Just launched our new product feature! Check it out and let me know your thoughts. #ProductManagement #Innovation",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    shares: 3,
    liked: false,
  },
  {
    id: 2,
    author: {
      name: "David Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      role: "Software Engineer at DevHub",
    },
    content:
      "Looking for recommendations on the best resources to learn about microservices architecture. Any suggestions from the community? #SoftwareEngineering #Microservices",
    timestamp: "5 hours ago",
    likes: 15,
    comments: 12,
    shares: 1,
    liked: false,
  },
  {
    id: 3,
    author: {
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      role: "UX Designer at CreativeStudio",
    },
    content:
      "Just finished a fascinating workshop on inclusive design patterns. It's amazing how small design changes can make such a big difference in accessibility. #UXDesign #Accessibility #InclusiveDesign",
    timestamp: "1 day ago",
    likes: 42,
    comments: 8,
    shares: 7,
    liked: true,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: number) => {
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
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
        role: "Professional at Loop Social",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl py-6 space-y-6">
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex space-x-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="What's on your mind?"
                className="flex-1 resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Image className="mr-2 h-4 w-4" />
                Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Video className="mr-2 h-4 w-4" />
                Video
              </Button>
            </div>
            <Button
              size="sm"
              onClick={handleCreatePost}
              disabled={!newPostContent.trim()}
            >
              Post
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
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
                      {post.author.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
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
                      post.liked ? "text-red-500" : "text-muted-foreground"
                    }
                    onClick={() => handleLike(post.id)}
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
        </div>
      </div>
    </MainLayout>
  );
}
