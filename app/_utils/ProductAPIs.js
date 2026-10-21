import axiosClient from "./axiosClient";

const getlatestproduct = () =>
  axiosClient.get("/projects?populate=*&sort=createdAt:desc");

const getProjectById = (id) =>
  axiosClient.get(`/projects/${encodeURIComponent(id)}?populate=*`);

const getProductByCategory = (category) =>
  axiosClient.get(
    `/projects?filters[category][$eqi]=${encodeURIComponent(
      category ?? ""
    )}&populate=*`
  );

export default {
  getlatestproduct,
  getProjectById,
  getProductByCategory,
};
