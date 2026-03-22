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

export interface UserProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export const mockUsers: UserProfile[] = [
  { username: "foodie_kim", name: "김푸디", avatar: dicebear("foodie_kim"), bio: "을지로 골목 전문가 🔥", followers: 234, following: 89 },
  { username: "pasta_lover", name: "파스타러버", avatar: dicebear("pasta_lover"), bio: "면 요리라면 다 좋아", followers: 156, following: 112 },
  { username: "cafe_hopper", name: "카페호퍼", avatar: dicebear("cafe_hopper"), bio: "서울 카페 500곳 정복 중 ☕", followers: 892, following: 201 },
  { username: "taco_fan", name: "타코광", avatar: dicebear("taco_fan"), bio: "멕시칸 음식 전도사 🌮", followers: 67, following: 45 },
];

// Add more posts per user for richer profiles
export const mockPostsExtended: Post[] = [
  ...mockPosts,
  { id: 5, user: "foodie_kim", avatar: dicebear("foodie_kim"), place: "광장시장 빈대떡", area: "종로5가", review: "바삭하고 고소한 게 진짜 맛있다", rating: "love", likes: 63, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600", time: "3일 전", category: "한식", lat: 37.570, lng: 126.999 },
  { id: 6, user: "foodie_kim", avatar: dicebear("foodie_kim"), place: "을지로 노가리골목", area: "을지로4가", review: "노가리에 맥주 조합은 진리", rating: "good", likes: 29, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600", time: "1주 전", category: "술집", lat: 37.567, lng: 126.996 },
  { id: 7, user: "cafe_hopper", avatar: dicebear("cafe_hopper"), place: "성수동 로스터리", area: "성수동", review: "핸드드립이 미쳤어 여기", rating: "love", likes: 41, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600", time: "4일 전", category: "카페", lat: 37.544, lng: 127.056 },
  { id: 8, user: "pasta_lover", avatar: dicebear("pasta_lover"), place: "이태원 피자집", area: "이태원", review: "나폴리 스타일 화덕피자 인정", rating: "love", likes: 55, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600", time: "5일 전", category: "양식", lat: 37.534, lng: 126.994 },
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
