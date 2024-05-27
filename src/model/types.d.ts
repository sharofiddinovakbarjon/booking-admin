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
  image_url: string;
  logo_url: string;
  has_alcohol: boolean;
  phone_number: string;
  address: string;
  lattitude: string;
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
