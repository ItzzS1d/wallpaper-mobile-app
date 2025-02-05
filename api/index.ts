import axios from "axios";

const API_KEY = "48559251-44bedfe6fcccf8b0cf98cfac4";
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

//{params:query,page,category}
const formateUrl = (params?: {}) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors+choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const apiCall = async (params?: {}) => {
  try {
    const res = await axios.get(formateUrl(params));
    const { data } = res;
    return { success: true, data };
  } catch (error) {
    console.log("error", error);
    return { success: false, error };
  }
};
