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
  name: string;
  image_url: string;
  logo_url: string;
  has_alcohol: boolean;
  phone_number: string;
  address: string;
  lattitude: null;
  longitude: null;
  start_working_time: null;
  end_working_time: null;
}
