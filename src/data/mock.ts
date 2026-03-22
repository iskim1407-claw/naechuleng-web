export interface Post {
  id: number;
  user: string;
  avatar: string;
  place: string;
  area: string;
  review: string;
  rating: "love" | "good" | "okay";
  likes: number;
  image: string;
  time: string;
  category: "한식" | "양식" | "카페" | "술집" | "분식" | "디저트";
  lat: number;
  lng: number;
}

const dicebear = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}`;

export const mockPosts: Post[] = [
  {
    id: 1,
    user: "foodie_kim",
    avatar: dicebear("foodie_kim"),
    place: "을지로 골목식당",
    area: "을지로3가",
    review: "여기 된장찌개 진짜 미침 🔥",
    rating: "love",
    likes: 47,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    time: "2시간 전",
    category: "한식",
    lat: 37.566,
    lng: 126.992,
  },
  {
    id: 2,
    user: "pasta_lover",
    avatar: dicebear("pasta_lover"),
    place: "연남동 파스타집",
    area: "연남동",
    review: "트러플 파스타 오일이 예술",
    rating: "love",
    likes: 32,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
    time: "5시간 전",
    category: "양식",
    lat: 37.566,
    lng: 126.925,
  },
  {
    id: 3,
    user: "cafe_hopper",
    avatar: dicebear("cafe_hopper"),
    place: "망원동 카페",
    area: "망원동",
    review: "분위기는 좋은데 커피는 그냥...",
    rating: "okay",
    likes: 15,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    time: "어제",
    category: "카페",
    lat: 37.556,
    lng: 126.91,
  },
  {
    id: 4,
    user: "taco_fan",
    avatar: dicebear("taco_fan"),
    place: "홍대 타코집",
    area: "홍대입구",
    review: "타코 3개에 만원 가성비 짱",
    rating: "love",
    likes: 28,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600",
    time: "2일 전",
    category: "양식",
    lat: 37.557,
    lng: 126.926,
  },
];

export const mockUser = {
  id: "user_1",
  name: "맛집탐험가",
  username: "food_explorer",
  avatar: dicebear("food_explorer"),
  bio: "서울 맛집 정복 중 🍽️",
  posts: 24,
  followers: 128,
  following: 89,
};
