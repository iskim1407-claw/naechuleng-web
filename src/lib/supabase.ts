import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  area: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  review_count: number;
  image_url: string;
  phone: string;
  created_at: string;
};

export type Post = {
  id: string;
  user_id: string;
  restaurant_id: string;
  review: string;
  rating: string;
  image: string;
  likes: number;
  created_at: string;
  // joined
  restaurant?: Restaurant;
  user?: { username: string; name: string; avatar: string };
};
