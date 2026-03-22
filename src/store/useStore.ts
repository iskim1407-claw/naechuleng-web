"use client";
import { create } from "zustand";
import { mockPosts, type Post } from "@/data/mock";

interface AppState {
  isLoggedIn: boolean;
  posts: Post[];
  likedIds: Set<number>;
  bookmarkedIds: Set<number>;
  login: () => void;
  logout: () => void;
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
  addPost: (post: Post) => void;
}

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  posts: mockPosts,
  likedIds: new Set(),
  bookmarkedIds: new Set(),
  login: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify({ loggedIn: true }));
    }
    set({ isLoggedIn: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    set({ isLoggedIn: false });
  },
  toggleLike: (id) => {
    const liked = new Set(get().likedIds);
    const posts = get().posts.map((p) => {
      if (p.id === id) {
        if (liked.has(id)) {
          liked.delete(id);
          return { ...p, likes: p.likes - 1 };
        } else {
          liked.add(id);
          return { ...p, likes: p.likes + 1 };
        }
      }
      return p;
    });
    set({ likedIds: liked, posts });
  },
  toggleBookmark: (id) => {
    const bm = new Set(get().bookmarkedIds);
    if (bm.has(id)) bm.delete(id);
    else bm.add(id);
    set({ bookmarkedIds: bm });
  },
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
}));
