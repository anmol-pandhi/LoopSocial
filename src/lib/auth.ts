import { supabase } from "./supabase";

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  localStorage.removeItem("isAuthenticated");
}
