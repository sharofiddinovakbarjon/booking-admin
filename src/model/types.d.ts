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

// API
interface CreateRoomData {
  name: string;
  image_url: File[] | null;
  capacity: number;
  price: number;
  room_category_id: string;
}

// Types of responses

interface GetUserRes {
  phone_number: string;
  fullname: string;
  profile_picture: string;
}


//"{'image_url': [ErrorDetail(string='File extension “” is not allowed. Allowed extensions are: bmp, dib, gif, jfif, jpe, jpg, jpeg, pbm, pgm, ppm, pnm, pfm, png, apng, blp, bufr, cur, pcx, dcx, dds, ps, eps, fit, fits, fli, flc, ftc, ftu, gbr, grib, h5, hdf, jp2, j2k, jpc, jpf, jpx, j2c, icns, ico, im, iim, mpg, mpeg, tif, tiff, mpo, msp, palm, pcd, pdf, pxr, psd, qoi, bw, rgb, rgba, sgi, ras, tga, icb, vda, vst, webp, wmf, emf, xbm, xpm.', code='invalid_extension')]}"