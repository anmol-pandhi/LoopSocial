export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          title: string | null;
          location: string | null;
          about: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          title?: string | null;
          location?: string | null;
          about?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          title?: string | null;
          location?: string | null;
          about?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      groups: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          category: string | null;
          image: string | null;
          created_by: string | null;
          created_at: string | null;
          updated_at: string | null;
          member_count: number | null;
          post_count: number | null;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          category?: string | null;
          image?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          member_count?: number | null;
          post_count?: number | null;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          category?: string | null;
          image?: string | null;
          created_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          member_count?: number | null;
          post_count?: number | null;
        };
      };
      group_members: {
        Row: {
          id: number;
          group_id: number;
          user_id: string;
          role: string | null;
          joined_at: string | null;
        };
        Insert: {
          id?: number;
          group_id: number;
          user_id: string;
          role?: string | null;
          joined_at?: string | null;
        };
        Update: {
          id?: number;
          group_id?: number;
          user_id?: string;
          role?: string | null;
          joined_at?: string | null;
        };
      };
      posts: {
        Row: {
          id: number;
          content: string;
          user_id: string | null;
          group_id: number | null;
          group_name: string | null;
          likes_count: number | null;
          comments_count: number | null;
          shares_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          content: string;
          user_id?: string | null;
          group_id?: number | null;
          group_name?: string | null;
          likes_count?: number | null;
          comments_count?: number | null;
          shares_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          content?: string;
          user_id?: string | null;
          group_id?: number | null;
          group_name?: string | null;
          likes_count?: number | null;
          comments_count?: number | null;
          shares_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      post_likes: {
        Row: {
          id: number;
          post_id: number;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          post_id: number;
          user_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          post_id?: number;
          user_id?: string;
          created_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: number;
          content: string;
          post_id: number;
          user_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          content: string;
          post_id: number;
          user_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          content?: string;
          post_id?: number;
          user_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      jobs: {
        Row: {
          id: number;
          title: string;
          company_name: string;
          company_logo: string | null;
          location: string | null;
          job_type: string | null;
          salary: string | null;
          description: string | null;
          requirements: string[] | null;
          posted_by: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          company_name: string;
          company_logo?: string | null;
          location?: string | null;
          job_type?: string | null;
          salary?: string | null;
          description?: string | null;
          requirements?: string[] | null;
          posted_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          company_name?: string;
          company_logo?: string | null;
          location?: string | null;
          job_type?: string | null;
          salary?: string | null;
          description?: string | null;
          requirements?: string[] | null;
          posted_by?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
