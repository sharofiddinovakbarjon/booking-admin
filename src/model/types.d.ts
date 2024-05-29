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

// =------------------------------------------------

// Types of responses

interface GetUserRes {
  phone_number: string;
  fullname: string;
  profile_picture: string;
}
