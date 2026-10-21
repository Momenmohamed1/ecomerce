import axios from "axios";

// في التطوير: http://localhost:1337/api
// في الإنتاج: https://your-strapi.up.railway.app/api  (بيتحدد من متغير NEXT_PUBLIC_API_URL على Vercel)
const apiurl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:1337/api";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;

const axiosClient = axios.create({
  baseURL: apiurl,
  timeout: 15000,
});

// Only send the header when a token actually exists
if (apiKey) {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${apiKey}`;
}

export default axiosClient;
