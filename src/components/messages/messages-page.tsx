import { useState } from "react";
import { MainLayout } from "../layouts/main-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Settings,
  Plus,
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "contact";
  timestamp: string;
  read?: boolean;
}

interface Conversation {
  id: number;
  contact: {
    id: number;
    name: string;
    avatar: string;
    status: "online" | "offline" | "away";
    lastSeen?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    read: boolean;
  };
  messages: Message[];
  unread?: number;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      contact: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        status: "online",
      },
      lastMessage: {
        content: "Let's discuss the project tomorrow",
        timestamp: "10:42 AM",
        read: true,
      },
      messages: [
        {
          id: 1,
          content: "Hi Alex, how's the product roadmap coming along?",
          sender: "contact",
          timestamp: "10:30 AM",
        },
        {
          id: 2,
          content: "It's going well! I've prioritized the features for Q3.",
          sender: "user",
          timestamp: "10:35 AM",
        },
        {
          id: 3,
          content: "Great! Can we review it together?",
          sender: "contact",
          timestamp: "10:38 AM",
        },
        {
          id: 4,
          content: "Sure, I'm available tomorrow afternoon.",
          sender: "user",
          timestamp: "10:40 AM",
        },
        {
          id: 5,
          content: "Let's discuss the project tomorrow",
          sender: "contact",
          timestamp: "10:42 AM",
        },
      ],
      unread: 0,
    },
    {
      id: 2,
      contact: {
        id: 2,
        name: "David Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        status: "offline",
        lastSeen: "2 hours ago",
      },
      lastMessage: {
        content: "I'll send you the design files",
        timestamp: "Yesterday",
        read: false,
      },
      messages: [
        {
          id: 1,
          content: "Hey, do you have time to review the UI designs?",
          sender: "contact",
          timestamp: "Yesterday, 4:30 PM",
        },
        {
          id: 2,
          content: "Yes, I can take a look. When do you need feedback by?",
          sender: "user",
          timestamp: "Yesterday, 4:45 PM",
        },
        {
          id: 3,
          content:
            "By tomorrow if possible. We need to finalize it for development.",
          sender: "contact",
          timestamp: "Yesterday, 5:00 PM",
        },
        {
          id: 4,
          content: "No problem, send them over and I'll review them tonight.",
          sender: "user",
          timestamp: "Yesterday, 5:15 PM",
        },
        {
          id: 5,
          content: "I'll send you the design files",
          sender: "contact",
          timestamp: "Yesterday, 5:30 PM",
        },
      ],
      unread: 2,
    },
    {
      id: 3,
      contact: {
        id: 3,
        name: "Emily Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        status: "away",
      },
      lastMessage: {
        content: "Thanks for your help with the presentation",
        timestamp: "2 days ago",
        read: true,
      },
      messages: [
        {
          id: 1,
          content:
            "Hi Alex, I need some help with the presentation for the client meeting.",
          sender: "contact",
          timestamp: "2 days ago, 1:30 PM",
        },
        {
          id: 2,
          content: "Sure, what do you need help with?",
          sender: "user",
          timestamp: "2 days ago, 1:45 PM",
        },
        {
          id: 3,
          content: "Can you review the slides and add some product metrics?",
          sender: "contact",
          timestamp: "2 days ago, 2:00 PM",
        },
        {
          id: 4,
          content:
            "I'll do that right away and send it back to you in an hour.",
          sender: "user",
          timestamp: "2 days ago, 2:15 PM",
        },
        {
          id: 5,
          content: "Thanks for your help with the presentation",
          sender: "contact",
          timestamp: "2 days ago, 4:30 PM",
        },
      ],
      unread: 0,
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation>(
    conversations[0],
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedMessage: Message = {
      id: Date.now(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, updatedMessage],
          lastMessage: {
            content: newMessage,
            timestamp: "Just now",
            read: true,
          },
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find(
        (c) => c.id === activeConversation.id,
      ) as Conversation,
    );
    setNewMessage("");
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Conversations List */}
        <div className="w-full max-w-xs border-r bg-background">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <Button size="icon" variant="ghost">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div key={conversation.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-2 py-3 ${activeConversation.id === conversation.id ? "bg-muted" : ""}`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-start w-full">
                      <div className="relative mr-3">
                        <Avatar>
                          <AvatarImage src={conversation.contact.avatar} />
                          <AvatarFallback>
                            {conversation.contact.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${conversation.contact.status === "online" ? "bg-green-500" : conversation.contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"}`}
                        ></span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.contact.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {conversation.lastMessage.timestamp}
                          </span>
                        </div>
                        <p
                          className={`text-sm truncate ${!conversation.lastMessage.read ? "font-medium" : "text-muted-foreground"}`}
                        >
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="ml-2">{conversation.unread}</Badge>
                      )}
                    </div>
                  </Button>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {/* Active Conversation */}
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={activeConversation.contact.avatar} />
                <AvatarFallback>
                  {activeConversation.contact.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">
                  {activeConversation.contact.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.contact.status === "online"
                    ? "Online"
                    : activeConversation.contact.status === "away"
                      ? "Away"
                      : `Last seen ${activeConversation.contact.lastSeen || "recently"}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "contact" && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={activeConversation.contact.avatar} />
                      <AvatarFallback>
                        {activeConversation.contact.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <form
              className="flex items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
