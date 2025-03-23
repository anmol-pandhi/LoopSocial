import { supabase } from "./supabase";
import { Group, Post } from "@/types/group";

export async function getGroups(): Promise<Group[]> {
  try {
    const { data, error } = await supabase.from("groups").select("*");

    if (error) throw error;

    // If no data in Supabase yet, return mock data
    if (!data || data.length === 0) {
      return getMockGroups();
    }

    return data as Group[];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return getMockGroups();
  }
}

export async function getJoinedGroups(userId: string): Promise<Group[]> {
  try {
    const { data, error } = await supabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", userId);

    if (error) throw error;

    if (!data || data.length === 0) {
      return getMockGroups().filter((group) => group.joined);
    }

    const groupIds = data.map((item) => item.group_id);

    const { data: groupsData, error: groupsError } = await supabase
      .from("groups")
      .select("*")
      .in("id", groupIds);

    if (groupsError) throw groupsError;

    return (groupsData || []).map((group) => ({
      ...group,
      joined: true,
    })) as Group[];
  } catch (error) {
    console.error("Error fetching joined groups:", error);
    return getMockGroups().filter((group) => group.joined);
  }
}

export async function joinGroup(
  userId: string,
  groupId: number,
): Promise<void> {
  try {
    const { error } = await supabase
      .from("group_members")
      .insert([{ user_id: userId, group_id: groupId }]);

    if (error) throw error;
  } catch (error) {
    console.error("Error joining group:", error);
    throw error;
  }
}

export async function leaveGroup(
  userId: string,
  groupId: number,
): Promise<void> {
  try {
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("user_id", userId)
      .eq("group_id", groupId);

    if (error) throw error;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
}

export async function getGroupPosts(groupId?: number): Promise<Post[]> {
  try {
    let query = supabase
      .from("posts")
      .select("*, profiles(full_name, avatar_url)");

    if (groupId) {
      query = query.eq("group_id", groupId);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    if (!data || data.length === 0) {
      return getMockGroupPosts();
    }

    return data.map((post) => ({
      id: post.id,
      author: {
        name: post.profiles.full_name,
        avatar: post.profiles.avatar_url,
      },
      group: post.group_name || "Unknown Group",
      content: post.content,
      timestamp: new Date(post.created_at).toLocaleString(),
      likes: post.likes_count || 0,
      comments: post.comments_count || 0,
      shares: post.shares_count || 0,
      liked: false, // Would need to check against user likes table
    }));
  } catch (error) {
    console.error("Error fetching group posts:", error);
    return getMockGroupPosts();
  }
}

// Mock data for fallback
function getMockGroups(): Group[] {
  return [
    {
      id: 1,
      name: "Product Management Professionals",
      description:
        "A community for product managers to share insights, best practices, and career advice.",
      category: "Product Management",
      members: 2547,
      posts: 128,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      joined: true,
    },
    {
      id: 2,
      name: "UX/UI Design Network",
      description:
        "Connect with designers, share your work, and get feedback from industry experts.",
      category: "Design",
      members: 1832,
      posts: 95,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      joined: true,
    },
    {
      id: 3,
      name: "Software Engineering Hub",
      description:
        "Discussions on software development, architecture, and engineering best practices.",
      category: "Engineering",
      members: 3214,
      posts: 156,
      image:
        "https://images.unsplash.com/photo-1573495612937-f978cc14e4b9?w=800&q=80",
      joined: false,
    },
    {
      id: 4,
      name: "Data Science Collective",
      description:
        "Share knowledge about data analysis, machine learning, and AI applications.",
      category: "Data Science",
      members: 1956,
      posts: 87,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      joined: false,
    },
    {
      id: 5,
      name: "Marketing Innovators",
      description:
        "Explore the latest marketing strategies, tools, and industry trends.",
      category: "Marketing",
      members: 1423,
      posts: 73,
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      joined: false,
    },
    {
      id: 6,
      name: "Startup Founders",
      description:
        "A community for entrepreneurs to share experiences and get advice on building startups.",
      category: "Entrepreneurship",
      members: 1876,
      posts: 104,
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
      joined: false,
    },
  ];
}

function getMockGroupPosts(): Post[] {
  return [
    {
      id: 1,
      author: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      },
      group: "Product Management Professionals",
      content:
        "Just published a new article on product discovery techniques that have worked well for our team. Check it out and let me know your thoughts! #ProductDiscovery #UserResearch",
      timestamp: "2 hours ago",
      likes: 34,
      comments: 8,
      shares: 5,
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Jessica Wong",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      },
      group: "UX/UI Design Network",
      content:
        "I'm working on redesigning our onboarding flow and would love some feedback. Here are the initial wireframes. What do you think about the user journey? #UXDesign #Wireframing",
      timestamp: "5 hours ago",
      likes: 27,
      comments: 15,
      shares: 3,
      liked: true,
    },
    {
      id: 3,
      author: {
        name: "Robert Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      },
      group: "Product Management Professionals",
      content:
        "We're hosting a virtual panel discussion next week on 'Building Products in Uncertain Times' with leaders from top tech companies. Register now to secure your spot! #ProductLeadership #VirtualEvent",
      timestamp: "1 day ago",
      likes: 42,
      comments: 7,
      shares: 12,
      liked: false,
    },
  ];
}
