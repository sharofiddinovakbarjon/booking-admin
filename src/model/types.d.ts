interface LoginBody {
  phone_number: string;
  password: string;
}

interface UserInfo {
  token: string;
  phone_number: string;
  password: string;
}

interface CafeInfo {
  id: string;
  name: string;
  image_url: File | null;
  logo_url: File | null;
  has_alcohol: boolean;
  phone_number: string;
  address: string;
  latitude: string;
  longitude: string;
  start_working_time: string;
  end_working_time: string;
}

interface Room {
  name: string;
  image_url: File;
  capacity: number;
  price: string;
  room_category_id: string;
}

interface Category {
  id: string;
  name: string;
  rooms: Room[];
}

// =------------------------------------------------

// Types of responses

interface GetUserRes {
  phone_number: string;
  fullname: string;
  profile_picture: string;
}
